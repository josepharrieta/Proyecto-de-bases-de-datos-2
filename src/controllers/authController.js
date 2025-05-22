import jwt from 'jsonwebtoken';
import { getDbService } from '../services/database/index.js';
import { comparePassword, hashPassword } from '../services/jwtService.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    
    const user = await getDbService().User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getDbService().User.findOne({ where: { email } });
    
    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token no proporcionado' });
    }

    // Invalidar el token en Redis
    await invalidateToken(token);

    res.status(200).json({ message: 'Logout exitoso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};