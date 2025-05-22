import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cache } from '../cache/redisService.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = async (token) => {
  // Verificar primero en caché
  const cached = await cache.get(`token:${token}`);
  if (cached) return cached;

  // Si no está en caché, verificar con JWT
  const decoded = jwt.verify(token, JWT_SECRET);
  
  // Almacenar en caché para futuras verificaciones
  await cache.set(`token:${token}`, decoded, 3600);
  
  return decoded;
};

export const invalidateToken = async (token) => {
  await cache.del(`token:${token}`);
};
