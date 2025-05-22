import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import retry from 'async-retry';

dotenv.config();

// Configuración de conexiones
let sequelize = null;
let mongoConnection = null;
const MAX_RETRIES = 5;
const RETRY_DELAY = 3000; // 3 segundos

export async function connectToDatabase() {
  const engine = process.env.DB_ENGINE?.toLowerCase() || 'mongo';
  
  try {
    if (!['mongo', 'postgres'].includes(engine)) {
      throw new Error('DB_ENGINE debe ser "mongo" o "postgres"');
    }

    // Conexión con reintentos
    await retry(
      async (bail) => {
        try {
          if (engine === 'postgres') {
            sequelize = new Sequelize(process.env.POSTGRES_URL, {
              dialect: 'postgres',
              logging: process.env.NODE_ENV === 'development' ? console.log : false,
              retry: {
                max: 5,
                timeout: 30000, // 30 segundos
                match: [/SequelizeConnectionError/]
              }
            });

            await sequelize.authenticate();
            console.log('Conexión a PostgreSQL establecida');
            
            if (process.env.NODE_ENV === 'development') {
              await sequelize.sync({ alter: true });
              console.log('Modelos de PostgreSQL sincronizados');
            }
          } 
          else if (engine === 'mongo') {
            // Configuración mejorada para MongoDB
            mongoose.connection.on('error', err => {
              console.error('Error de conexión MongoDB:', err);
            });

            mongoose.connection.on('disconnected', () => {
              console.log('MongoDB desconectado. Intentando reconectar...');
            });

            mongoConnection = await mongoose.connect(process.env.MONGODB_URI, {
              serverSelectionTimeoutMS: 30000,
              socketTimeoutMS: 45000,
              connectTimeoutMS: 30000,
              maxPoolSize: 50,
              retryWrites: true,
              w: 'majority',
              retryReads: true
            });

            console.log('Conexión a MongoDB establecida');
          }
        } catch (error) {
          console.error(`Intento fallido (${error.message})`);
          throw error; // Esto activará el reintento
        }
      },
      {
        retries: MAX_RETRIES,
        minTimeout: RETRY_DELAY,
        onRetry: (error, attempt) => {
          console.log(`Reintento ${attempt}/${MAX_RETRIES} para conexión a ${engine}`);
        }
      }
    );
  } catch (error) {
    console.error('Error crítico al conectar a la base de datos:', error);
    await closeConnections();
    throw new Error(`No se pudo conectar a ${engine} después de ${MAX_RETRIES} intentos`);
  }
}

export async function closeConnections() {
  try {
    const closingPromises = [];
    
    if (sequelize) {
      closingPromises.push(sequelize.close().then(() => {
        console.log('Conexión PostgreSQL cerrada');
        sequelize = null;
      }));
    }
    
    if (mongoConnection) {
      closingPromises.push(mongoConnection.disconnect().then(() => {
        console.log('Conexión MongoDB cerrada');
        mongoConnection = null;
      }));
    }

    await Promise.allSettled(closingPromises);
  } catch (error) {
    console.error('Error al cerrar conexiones:', error);
  }
}

// Manejadores para cierre limpio
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => {
  process.on(signal, async () => {
    console.log(`\nRecibido ${signal}. Cerrando conexiones...`);
    await closeConnections();
    process.exit(0);
  });
});

// Exportar instancias para uso en modelos
export { sequelize, mongoose };