
// Mock para loadDaos
const mockRoleDAO = {
  create: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

jest.mock('../../src/services/database/index.js', () => ({
  loadDaos: () => ({
    roleDAO: mockRoleDAO
  })
}));

// Importar después del mock
const {
  createRole,
  getRoles,
  updateRole,
  deleteRole
} = require('../../src/controllers/roleController');

describe('Role Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: { name: 'admin' },
      params: { id: 'role123' }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createRole', () => {
    test('debe crear un rol exitosamente', async () => {
      const mockRole = { id: 'role123', name: 'admin' };
      mockRoleDAO.create.mockResolvedValue(mockRole);

      await createRole(req, res);

      expect(mockRoleDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockRole);
    });

    test('debe manejar errores al crear un rol', async () => {
      const errorMsg = 'Error al crear rol';
      mockRoleDAO.create.mockRejectedValue(new Error(errorMsg));

      await createRole(req, res);

      expect(mockRoleDAO.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('getRoles', () => {
    test('debe obtener los roles exitosamente', async () => {
      const mockRoles = [
        { id: 'role1', name: 'admin' },
        { id: 'role2', name: 'user' }
      ];
      mockRoleDAO.getAll.mockResolvedValue(mockRoles);

      await getRoles(req, res);

      expect(mockRoleDAO.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockRoles);
    });

    test('debe manejar errores al obtener roles', async () => {
      const errorMsg = 'Error al obtener roles';
      mockRoleDAO.getAll.mockRejectedValue(new Error(errorMsg));

      await getRoles(req, res);

      expect(mockRoleDAO.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('updateRole', () => {
    test('debe actualizar un rol exitosamente', async () => {
      const updatedRole = { id: 'role123', name: 'superadmin' };
      mockRoleDAO.update.mockResolvedValue(updatedRole);

      await updateRole(req, res);

      expect(mockRoleDAO.update).toHaveBeenCalledWith('role123', req.body);
      expect(res.json).toHaveBeenCalledWith(updatedRole);
    });

    test('debe retornar 404 si el rol no existe', async () => {
      mockRoleDAO.update.mockResolvedValue(null);

      await updateRole(req, res);

      expect(mockRoleDAO.update).toHaveBeenCalledWith('role123', req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Role not found' });
    });

    test('debe manejar errores al actualizar rol', async () => {
      const errorMsg = 'Error al actualizar rol';
      mockRoleDAO.update.mockRejectedValue(new Error(errorMsg));

      await updateRole(req, res);

      expect(mockRoleDAO.update).toHaveBeenCalledWith('role123', req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('deleteRole', () => {
    test('debe eliminar un rol exitosamente', async () => {
      mockRoleDAO.delete.mockResolvedValue(true);

      await deleteRole(req, res);

      expect(mockRoleDAO.delete).toHaveBeenCalledWith('role123');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test('debe retornar 404 si el rol no existe', async () => {
      mockRoleDAO.delete.mockResolvedValue(false);

      await deleteRole(req, res);

      expect(mockRoleDAO.delete).toHaveBeenCalledWith('role123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Role not found' });
    });

    test('debe manejar errores al eliminar rol', async () => {
      const errorMsg = 'Error al eliminar rol';
      mockRoleDAO.delete.mockRejectedValue(new Error(errorMsg));

      await deleteRole(req, res);

      expect(mockRoleDAO.delete).toHaveBeenCalledWith('role123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });
});
