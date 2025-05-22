import { verifyToken } from '../services/jwt/jwtService.js';
import { invalidateToken } from '../services/jwt/jwtService.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token inválido' });

  try {
    const decoded = await verifyToken(token); // Ahora verifyToken maneja la caché
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido o expirado' });
  }
};


export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await invalidateToken(token);
    }
    res.json({ message: 'Logout exitoso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};