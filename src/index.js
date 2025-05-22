// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes/mainRoutes.js';
import { connectToDatabase } from './config/dbConfig.js';
import { connectToRedis } from './services/cache/redisService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas principales
app.use('/api', routes);

// Conectar a Redis
connectToRedis()
  .then(() => console.log('Redis conectado'))
  .catch((err) => console.error(' Redis error:', err));

// Conectar a la base de datos (Mongo o Postgres)
connectToDatabase()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });

    process.on('SIGTERM', () => {
      server.close(() => {
        mongoose.connection?.close();
        sequelize?.close();
      });
    });
  })
  .catch((err) => {
    console.error('Error al iniciar:', err);
    process.exit(1);
  });


