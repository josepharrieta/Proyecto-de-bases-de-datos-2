
// Mock para loadDaos
const mockRestaurantAvailabilityDAO = {
  create: jest.fn(),
  getByRestaurant: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

jest.mock('../../src/services/database/index.js', () => ({
  loadDaos: () => ({
    restaurantAvailabilityDAO: mockRestaurantAvailabilityDAO
  })
}));

// Importar después de aplicar mocks
const {
  createAvailability,
  getAvailabilitiesByRestaurant,
  updateAvailability,
  deleteAvailability
} = require('../../src/controllers/restaurantAvailabilityController.js');

describe('Availability Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        restaurantId: 'rest123',
        date: '2025-05-21',
        time: '18:00',
        availableTables: 5
      },
      params: {
        id: 'avail123',
        restaurantId: 'rest123'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createAvailability', () => {
    test('debe crear una disponibilidad exitosamente', async () => {
      const mockAvailability = { ...req.body, id: 'avail123' };
      mockRestaurantAvailabilityDAO.create.mockResolvedValue(mockAvailability);

      await createAvailability(req, res);

      expect(mockRestaurantAvailabilityDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockAvailability);
    });

    test('debe manejar errores al crear una disponibilidad', async () => {
      const errorMsg = 'Error al crear disponibilidad';
      mockRestaurantAvailabilityDAO.create.mockRejectedValue(new Error(errorMsg));

      await createAvailability(req, res);

      expect(mockRestaurantAvailabilityDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('getAvailabilitiesByRestaurant', () => {
    test('debe obtener disponibilidades exitosamente', async () => {
      const mockAvailabilities = [
        { id: 'a1', restaurantId: 'rest123', date: '2025-05-21', time: '18:00', availableTables: 5 }
      ];
      mockRestaurantAvailabilityDAO.getByRestaurant.mockResolvedValue(mockAvailabilities);

      await getAvailabilitiesByRestaurant(req, res);

      expect(mockRestaurantAvailabilityDAO.getByRestaurant).toHaveBeenCalledWith('rest123');
      expect(res.json).toHaveBeenCalledWith(mockAvailabilities);
    });

    test('debe manejar errores al obtener disponibilidades', async () => {
      const errorMsg = 'Error al obtener disponibilidades';
      mockRestaurantAvailabilityDAO.getByRestaurant.mockRejectedValue(new Error(errorMsg));

      await getAvailabilitiesByRestaurant(req, res);

      expect(mockRestaurantAvailabilityDAO.getByRestaurant).toHaveBeenCalledWith('rest123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('updateAvailability', () => {
    test('debe actualizar una disponibilidad exitosamente', async () => {
      const updatedAvailability = { ...req.body, id: 'avail123' };
      mockRestaurantAvailabilityDAO.update.mockResolvedValue(updatedAvailability);

      await updateAvailability(req, res);

      expect(mockRestaurantAvailabilityDAO.update).toHaveBeenCalledWith('avail123', req.body);
      expect(res.json).toHaveBeenCalledWith(updatedAvailability);
    });

    test('debe retornar 404 si la disponibilidad no existe', async () => {
      mockRestaurantAvailabilityDAO.update.mockResolvedValue(null);

      await updateAvailability(req, res);

      expect(mockRestaurantAvailabilityDAO.update).toHaveBeenCalledWith('avail123', req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Availability not found' });
    });

    test('debe manejar errores al actualizar disponibilidad', async () => {
      const errorMsg = 'Error al actualizar disponibilidad';
      mockRestaurantAvailabilityDAO.update.mockRejectedValue(new Error(errorMsg));

      await updateAvailability(req, res);

      expect(mockRestaurantAvailabilityDAO.update).toHaveBeenCalledWith('avail123', req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('deleteAvailability', () => {
    test('debe eliminar una disponibilidad exitosamente', async () => {
      mockRestaurantAvailabilityDAO.delete.mockResolvedValue(true);

      await deleteAvailability(req, res);

      expect(mockRestaurantAvailabilityDAO.delete).toHaveBeenCalledWith('avail123');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test('debe retornar 404 si no se encuentra la disponibilidad', async () => {
      mockRestaurantAvailabilityDAO.delete.mockResolvedValue(false);

      await deleteAvailability(req, res);

      expect(mockRestaurantAvailabilityDAO.delete).toHaveBeenCalledWith('avail123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Availability not found' });
    });

    test('debe manejar errores al eliminar disponibilidad', async () => {
      const errorMsg = 'Error al eliminar disponibilidad';
      mockRestaurantAvailabilityDAO.delete.mockRejectedValue(new Error(errorMsg));

      await deleteAvailability(req, res);

      expect(mockRestaurantAvailabilityDAO.delete).toHaveBeenCalledWith('avail123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });
});
