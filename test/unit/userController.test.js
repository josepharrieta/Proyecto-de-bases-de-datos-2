
// Mock para loadRepositories
const mockUserRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

jest.mock('../../src/services/database/index.js', () => ({
  loadRepositories: () => ({
    userRepository: mockUserRepository
  })
}));

// Importar después del mock
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../../src/controllers/userController');

describe('User Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: { name: 'Alice', email: 'alice@example.com' },
      params: { id: 'user123' }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createUser', () => {
    test('debe crear un usuario exitosamente', async () => {
      const mockUser = { id: 'user123', ...req.body };
      mockUserRepository.create.mockResolvedValue(mockUser);

      await createUser(req, res);

      expect(mockUserRepository.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('debe manejar errores al crear usuario', async () => {
      const errorMsg = 'Error al crear usuario';
      mockUserRepository.create.mockRejectedValue(new Error(errorMsg));

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('getUserById', () => {
    test('debe obtener un usuario por ID exitosamente', async () => {
      const mockUser = { id: 'user123', name: 'Alice' };
      mockUserRepository.getById.mockResolvedValue(mockUser);

      await getUserById(req, res);

      expect(mockUserRepository.getById).toHaveBeenCalledWith('user123');
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('debe retornar 404 si el usuario no existe', async () => {
      mockUserRepository.getById.mockResolvedValue(null);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    test('debe manejar errores al obtener usuario', async () => {
      const errorMsg = 'Error al obtener usuario';
      mockUserRepository.getById.mockRejectedValue(new Error(errorMsg));

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('updateUser', () => {
    test('debe actualizar un usuario exitosamente', async () => {
      const updatedUser = { id: 'user123', name: 'Updated' };
      mockUserRepository.update.mockResolvedValue(updatedUser);

      await updateUser(req, res);

      expect(mockUserRepository.update).toHaveBeenCalledWith('user123', req.body);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    test('debe retornar 404 si el usuario no existe', async () => {
      mockUserRepository.update.mockResolvedValue(null);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    test('debe manejar errores al actualizar usuario', async () => {
      const errorMsg = 'Error al actualizar usuario';
      mockUserRepository.update.mockRejectedValue(new Error(errorMsg));

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('deleteUser', () => {
    test('debe eliminar un usuario exitosamente', async () => {
      mockUserRepository.delete.mockResolvedValue(true);

      await deleteUser(req, res);

      expect(mockUserRepository.delete).toHaveBeenCalledWith('user123');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test('debe retornar 404 si el usuario no existe', async () => {
      mockUserRepository.delete.mockResolvedValue(false);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    test('debe manejar errores al eliminar usuario', async () => {
      const errorMsg = 'Error al eliminar usuario';
      mockUserRepository.delete.mockRejectedValue(new Error(errorMsg));

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });
});
