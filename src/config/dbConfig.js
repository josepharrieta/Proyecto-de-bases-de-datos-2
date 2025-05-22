const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

class DatabaseConfig {
    constructor() {
        this.databaseType = process.env.DATABASE_TYPE || 'mongodb';
        this.mongoConnection = null;
        this.postgresConnection = null;
    }

    async connect() {
        try {
            if (this.databaseType === 'mongodb') {
                await this.connectMongoDB();
            } else if (this.databaseType === 'postgres') {
                await this.connectPostgreSQL();
            } else {
                throw new Error(`Unsupported database type: ${this.databaseType}`);
            }
        } catch (error) {
            console.error('Database connection failed:', error);
            throw error;
        }
    }

    async connectMongoDB() {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant_db';
        
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        };

        this.mongoConnection = await mongoose.connect(mongoUri, options);
        
        // Setup sharding if not already configured
        await this.setupSharding();
        
        console.log('Connected to MongoDB successfully');
        return this.mongoConnection;
    }

    async connectPostgreSQL() {
        const postgresUri = process.env.POSTGRES_URI || 
            'postgresql://postgres:postgres123@localhost:5432/restaurant_db';

        this.postgresConnection = new Sequelize(postgresUri, {
            dialect: 'postgres',
            logging: process.env.NODE_ENV === 'development' ? console.log : false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

        await this.postgresConnection.authenticate();
        console.log('Connected to PostgreSQL successfully');
        return this.postgresConnection;
    }

    async setupSharding() {
        try {
            const db = mongoose.connection.db;
            
            // Enable sharding for the database
            await db.admin().command({ enableSharding: "restaurant_db" });
            
            // Shard the products collection by product_id
            await db.admin().command({
                shardCollection: "restaurant_db.products",
                key: { _id: 1 }
            });
            
            // Shard the reservations collection by restaurant_id
            await db.admin().command({
                shardCollection: "restaurant_db.reservations",
                key: { restaurant_id: 1 }
            });
            
            console.log('Sharding configuration completed');
        } catch (error) {
            // Sharding might already be configured
            console.log('Sharding setup:', error.message);
        }
    }

    getConnection() {
        if (this.databaseType === 'mongodb') {
            return this.mongoConnection;
        } else if (this.databaseType === 'postgres') {
            return this.postgresConnection;
        }
        return null;
    }

    getDatabaseType() {
        return this.databaseType;
    }

    async disconnect() {
        try {
            if (this.databaseType === 'mongodb' && this.mongoConnection) {
                await mongoose.disconnect();
                console.log('Disconnected from MongoDB');
            } else if (this.databaseType === 'postgres' && this.postgresConnection) {
                await this.postgresConnection.close();
                console.log('Disconnected from PostgreSQL');
            }
        } catch (error) {
            console.error('Error disconnecting from database:', error);
        }
    }
}

module.exports = new DatabaseConfig();