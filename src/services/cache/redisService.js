import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({
  url: process.env.REDIS_URL 
});

client.on('error', (err) => console.error('Redis error:', err));

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

export const cache = {
  get: async (key) => {
    const data = await getAsync(key);
    return data ? JSON.parse(data) : null;
  },
  set: async (key, value, ttl = 3600) => {
    await setexAsync(key, ttl, JSON.stringify(value));
  },
  del: async (key) => {
    await client.del(key);
  }
};

// Añadir estos métodos después de las funciones existentes:
export const tokenCache = {
  setToken: async (userId, token, ttl = 3600) => {
    await setexAsync(`token:${userId}`, ttl, token);
  },
  getToken: async (userId) => {
    return await getAsync(`token:${userId}`);
  },
  invalidateToken: async (userId) => {
    await client.del(`token:${userId}`);
  }
};