
// Mock para loadRepositories
const mockRestaurantRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

jest.mock('../../src/services/database/index.js', () => ({
  loadRepositories: () => ({
    restaurantRepository: mockRestaurantRepository
  })
}));

// Importar después del mock
const {
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('../../src/controllers/restaurantController.js');

describe('Restaurant Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        name: 'Test Restaurant',
        address: '123 Main St'
      },
      params: {
        id: 'rest123'
      },
      user: {
        id: 'owner456'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createRestaurant', () => {
    test('debe crear un restaurante exitosamente', async () => {
      const mockRestaurant = { id: 'rest123', ...req.body, ownerId: 'owner456' };
      mockRestaurantRepository.create.mockResolvedValue(mockRestaurant);

      await createRestaurant(req, res);

      expect(mockRestaurantRepository.create).toHaveBeenCalledWith({
        ...req.body,
        ownerId: 'owner456'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockRestaurant);
    });

    test('debe manejar errores al crear un restaurante', async () => {
      const errorMsg = 'Error al crear restaurante';
      mockRestaurantRepository.create.mockRejectedValue(new Error(errorMsg));

      await createRestaurant(req, res);

      expect(mockRestaurantRepository.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('getRestaurantById', () => {
    test('debe obtener un restaurante exitosamente', async () => {
      const mockRestaurant = { id: 'rest123', name: 'Test Restaurant' };
      mockRestaurantRepository.getById.mockResolvedValue(mockRestaurant);

      await getRestaurantById(req, res);

      expect(mockRestaurantRepository.getById).toHaveBeenCalledWith('rest123');
      expect(res.json).toHaveBeenCalledWith(mockRestaurant);
    });

    test('debe retornar 404 si no se encuentra el restaurante', async () => {
      mockRestaurantRepository.getById.mockResolvedValue(null);

      await getRestaurantById(req, res);

      expect(mockRestaurantRepository.getById).toHaveBeenCalledWith('rest123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Restaurant not found' });
    });

    test('debe manejar errores al obtener restaurante', async () => {
      const errorMsg = 'Error al obtener restaurante';
      mockRestaurantRepository.getById.mockRejectedValue(new Error(errorMsg));

      await getRestaurantById(req, res);

      expect(mockRestaurantRepository.getById).toHaveBeenCalledWith('rest123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('updateRestaurant', () => {
    test('debe actualizar un restaurante exitosamente', async () => {
      const updatedRestaurant = { id: 'rest123', ...req.body };
      mockRestaurantRepository.update.mockResolvedValue(updatedRestaurant);

      await updateRestaurant(req, res);

      expect(mockRestaurantRepository.update).toHaveBeenCalledWith('rest123', req.body);
      expect(res.json).toHaveBeenCalledWith(updatedRestaurant);
    });

    test('debe retornar 404 si el restaurante no existe', async () => {
      mockRestaurantRepository.update.mockResolvedValue(null);

      await updateRestaurant(req, res);

      expect(mockRestaurantRepository.update).toHaveBeenCalledWith('rest123', req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Restaurant not found' });
    });

    test('debe manejar errores al actualizar restaurante', async () => {
      const errorMsg = 'Error al actualizar restaurante';
      mockRestaurantRepository.update.mockRejectedValue(new Error(errorMsg));

      await updateRestaurant(req, res);

      expect(mockRestaurantRepository.update).toHaveBeenCalledWith('rest123', req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('deleteRestaurant', () => {
    test('debe eliminar un restaurante exitosamente', async () => {
      mockRestaurantRepository.delete.mockResolvedValue(true);

      await deleteRestaurant(req, res);

      expect(mockRestaurantRepository.delete).toHaveBeenCalledWith('rest123');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test('debe retornar 404 si el restaurante no existe', async () => {
      mockRestaurantRepository.delete.mockResolvedValue(false);

      await deleteRestaurant(req, res);

      expect(mockRestaurantRepository.delete).toHaveBeenCalledWith('rest123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Restaurant not found' });
    });

    test('debe manejar errores al eliminar restaurante', async () => {
      const errorMsg = 'Error al eliminar restaurante';
      mockRestaurantRepository.delete.mockRejectedValue(new Error(errorMsg));

      await deleteRestaurant(req, res);

      expect(mockRestaurantRepository.delete).toHaveBeenCalledWith('rest123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });
});
