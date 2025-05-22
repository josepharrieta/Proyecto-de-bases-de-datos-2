const redis = require('redis');

class RedisService {
    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
            
            this.client = redis.createClient({
                url: redisUrl,
                retry_strategy: (options) => {
                    if (options.error && options.error.code === 'ECONNREFUSED') {
                        return new Error('The server refused the connection');
                    }
                    if (options.total_retry_time > 1000 * 60 * 60) {
                        return new Error('Retry time exhausted');
                    }
                    if (options.attempt > 10) {
                        return undefined;
                    }
                    return Math.min(options.attempt * 100, 3000);
                }
            });

            this.client.on('error', (err) => {
                console.error('Redis Client Error:', err);
                this.isConnected = false;
            });

            this.client.on('connect', () => {
                console.log('Connected to Redis');
                this.isConnected = true;
            });

            await this.client.connect();
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            this.isConnected = false;
        }
    }

    async get(key) {
        if (!this.isConnected) return null;
        try {
            const result = await this.client.get(key);
            return result ? JSON.parse(result) : null;
        } catch (error) {
            console.error('Redis GET error:', error);
            return null;
        }
    }

    async set(key, value, expireInSeconds = 3600) {
        if (!this.isConnected) return false;
        try {
            await this.client.setEx(key, expireInSeconds, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Redis SET error:', error);
            return false;
        }
    }

    async del(key) {
        if (!this.isConnected) return false;
        try {
            await this.client.del(key);
            return true;
        } catch (error) {
            console.error('Redis DEL error:', error);
            return false;
        }
    }

    async exists(key) {
        if (!this.isConnected) return false;
        try {
            return await this.client.exists(key);
        } catch (error) {
            console.error('Redis EXISTS error:', error);
            return false;
        }
    }

    async flushAll() {
        if (!this.isConnected) return false;
        try {
            await this.client.flushAll();
            return true;
        } catch (error) {
            console.error('Redis FLUSHALL error:', error);
            return false;
        }
    }

    async disconnect() {
        if (this.client) {
            await this.client.quit();
            this.isConnected = false;
            console.log('Disconnected from Redis');
        }
    }

    // Cache helpers
    generateKey(prefix, ...args) {
        return `${prefix}:${args.join(':')}`;
    }

    async cacheWrapper(key, fetchFunction, expireInSeconds = 3600) {
        // Try to get from cache first
        const cached = await this.get(key);
        if (cached) {
            return cached;
        }

        // If not in cache, fetch and store
        try {
            const result = await fetchFunction();
            await this.set(key, result, expireInSeconds);
            return result;
        } catch (error) {
            console.error('Cache wrapper error:', error);
            throw error;
        }
    }
}

module.exports = new RedisService();