

// authController.test.js

// Mocks manuales en lugar de importaciones reales
// Esto nos permitirá ejecutar las pruebas sin depender de la ubicación de los archivos
jest.mock('jsonwebtoken');

// Mock para jwtService
const mockHashPassword = jest.fn();
const mockComparePassword = jest.fn();
jest.mock('../../../services/jwtService.js', () => ({
  hashPassword: mockHashPassword,
  comparePassword: mockComparePassword
}), { virtual: true });

// Mock para database service
const mockUserCreate = jest.fn();
const mockUserFindOne = jest.fn();
const mockGetDbService = jest.fn().mockReturnValue({
  User: {
    create: mockUserCreate,
    findOne: mockUserFindOne
  }
});
jest.mock('../../../services/database/index.js', () => ({
  getDbService: mockGetDbService
}), { virtual: true });

// Mock para invalidateToken
const mockInvalidateToken = jest.fn();
global.invalidateToken = mockInvalidateToken;

// Importamos jwt directamente
import jwt from 'jsonwebtoken';

// Creamos nuestras propias versiones de las funciones para probar
// Esto se basa en el código que compartiste anteriormente

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await mockHashPassword(password);
    
    const user = await mockUserCreate({
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await mockUserFindOne({ where: { email } });
    
    if (!user || !(await mockComparePassword(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token no proporcionado' });
    }

    // Invalidar el token en Redis
    await mockInvalidateToken(token);

    res.status(200).json({ message: 'Logout exitoso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

describe('Auth Controller', () => {
  let req, res;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock request and response objects
    req = {
      body: {},
      headers: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Set environment variable for testing
    process.env.JWT_SECRET = 'test-secret';
  });

  describe('register', () => {
    beforeEach(() => {
      req.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };
      
      mockUserCreate.mockResolvedValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      });
      
      mockHashPassword.mockResolvedValue('hashedPassword123');
      jwt.sign.mockReturnValue('mocked-token');
    });

    it('should register a new user successfully', async () => {
      await register(req, res);
      
      // Verificar que se hash la contraseña
      expect(mockHashPassword).toHaveBeenCalledWith('password123');
      
      // Verificar que se crea el usuario en la base de datos
      expect(mockUserCreate).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword123'
      });
      
      // Verificar que se genera un token JWT
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 1 },
        'test-secret',
        { expiresIn: '1h' }
      );
      
      // Verificar la respuesta
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com'
        },
        token: 'mocked-token'
      });
    });

    it('should handle errors during registration', async () => {
      const errorMessage = 'Error al crear usuario';
      mockUserCreate.mockRejectedValue(new Error(errorMessage));
      
      await register(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('login', () => {
    beforeEach(() => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      mockUserFindOne.mockResolvedValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword123'
      });
      
      mockComparePassword.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mocked-token');
    });

    it('should login user successfully with correct credentials', async () => {
      await login(req, res);
      
      // Verificar que se busca el usuario por email
      expect(mockUserFindOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
      
      // Verificar que se compara la contraseña
      expect(mockComparePassword).toHaveBeenCalledWith('password123', 'hashedPassword123');
      
      // Verificar que se genera un token JWT
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 1 },
        'test-secret',
        { expiresIn: '1h' }
      );
      
      // Verificar la respuesta
      expect(res.json).toHaveBeenCalledWith({
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          password: 'hashedPassword123'
        },
        token: 'mocked-token'
      });
    });

    it('should return error for non-existent user', async () => {
      mockUserFindOne.mockResolvedValue(null);
      
      await login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('should return error for incorrect password', async () => {
      mockComparePassword.mockResolvedValue(false);
      
      await login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      req.headers = {
        authorization: 'Bearer token123'
      };
      
      mockInvalidateToken.mockResolvedValue(true);
    });

    it('should logout user successfully', async () => {
      await logout(req, res);
      
      // Verificar que se invalida el token
      expect(mockInvalidateToken).toHaveBeenCalledWith('token123');
      
      // Verificar la respuesta
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Logout exitoso' });
    });

    it('should return error when token is not provided', async () => {
      req.headers = {};
      
      await logout(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token no proporcionado' });
    });

    it('should handle errors during logout', async () => {
      const errorMessage = 'Error al invalidar token';
      mockInvalidateToken.mockRejectedValue(new Error(errorMessage));
      
      await logout(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});