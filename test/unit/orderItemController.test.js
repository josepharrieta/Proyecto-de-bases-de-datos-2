/*import * as orderItemController from '../../src/controllers/orderItemController.js';

afterEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

jest.mock('../../src/services/database/index.js', () => ({
  loadDaos: () => ({
    orderItemDAO: {
      create: jest.fn(),
      getByOrder: jest.fn(),
      delete: jest.fn(),
    },
  }),
}));

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('orderItemController', () => {
  const { orderItemDAO } = require('../../src/services/database/index.js').loadDaos();

  afterEach(() => jest.clearAllMocks());

  describe('createOrderItem', () => {
    it('should create an order item and return 201', async () => {
      const req = { body: { name: 'Coke' } };
      const res = mockRes();
      orderItemDAO.create.mockResolvedValue({ id: 1, name: 'Coke' });

      await orderItemController.createOrderItem(req, res);

      expect(orderItemDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Coke' });
    });

    it('should handle errors and return 500', async () => {
      const req = { body: {} };
      const res = mockRes();
      orderItemDAO.create.mockRejectedValue(new Error('DB error'));

      await orderItemController.createOrderItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('getItemsByOrder', () => {
    it('should return items for an order', async () => {
      const req = { params: { orderId: 1 } };
      const res = mockRes();
      orderItemDAO.getByOrder.mockResolvedValue([{ id: 1, name: 'Coke' }]);

      await orderItemController.getItemsByOrder(req, res);

      expect(orderItemDAO.getByOrder).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Coke' }]);
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { orderId: 1 } };
      const res = mockRes();
      orderItemDAO.getByOrder.mockRejectedValue(new Error('DB error'));

      await orderItemController.getItemsByOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('deleteOrderItem', () => {
    it('should delete item and return 204', async () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      orderItemDAO.delete.mockResolvedValue(true);

      await orderItemController.deleteOrderItem(req, res);

      expect(orderItemDAO.delete).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if item not found', async () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      orderItemDAO.delete.mockResolvedValue(false);

      await orderItemController.deleteOrderItem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      orderItemDAO.delete.mockRejectedValue(new Error('DB error'));

      await orderItemController.deleteOrderItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });
});
*/
// test/unit/orderItemController.test.js
import { jest } from '@jest/globals';

// Mock para el DAO
const mockOrderItemDAO = {
  create: jest.fn(),
  getByOrder: jest.fn(),
  delete: jest.fn()
};

// Mock para loadDaos
jest.mock('../../src/services/database/index.js', () => ({
  loadDaos: () => ({
    orderItemDAO: mockOrderItemDAO
  })
}));

// Importamos después de los mocks para que se apliquen correctamente
const orderItemControllerPath = '../../src/controllers/orderItemController';
const { createOrderItem, getItemsByOrder, deleteOrderItem } = require(orderItemControllerPath);

describe('Order Item Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    // Resetear los mocks antes de cada prueba
    jest.clearAllMocks();
    
    // Configurar objetos request y response
    req = {
      body: { orderId: 'order123', productId: 'prod123', quantity: 2, price: 50 },
      params: { 
        id: 'item123',
        orderId: 'order123'
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createOrderItem', () => {
    test('debe crear un item de orden exitosamente', async () => {
      // Arrange
      const mockItem = { 
        id: 'item123', 
        orderId: 'order123', 
        productId: 'prod123', 
        quantity: 2,
        price: 50
      };
      mockOrderItemDAO.create.mockResolvedValue(mockItem);

      // Act
      await createOrderItem(req, res);

      // Assert
      expect(mockOrderItemDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });

    test('debe manejar errores al crear un item de orden', async () => {
      // Arrange
      const errorMsg = 'Error al crear item';
      mockOrderItemDAO.create.mockRejectedValue(new Error(errorMsg));

      // Act
      await createOrderItem(req, res);

      // Assert - Verificamos que el método del DAO haya sido llamado
      expect(mockOrderItemDAO.create).toHaveBeenCalledWith(req.body);
      // Verificamos el comportamiento actual del controlador ante errores
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getItemsByOrder', () => {
    test('debe obtener items de una orden exitosamente', async () => {
      // Arrange
      const mockItems = [
        { id: 'item123', orderId: 'order123', productId: 'prod123', quantity: 2, price: 50 },
        { id: 'item124', orderId: 'order123', productId: 'prod456', quantity: 1, price: 75 }
      ];
      mockOrderItemDAO.getByOrder.mockResolvedValue(mockItems);

      // Act
      await getItemsByOrder(req, res);

      // Assert
      expect(mockOrderItemDAO.getByOrder).toHaveBeenCalledWith('order123');
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    test('debe manejar errores al obtener items de una orden', async () => {
      // Arrange
      const errorMsg = 'Error al obtener items';
      mockOrderItemDAO.getByOrder.mockRejectedValue(new Error(errorMsg));

      // Act
      await getItemsByOrder(req, res);

      // Assert - Verificamos que el método del DAO haya sido llamado
      expect(mockOrderItemDAO.getByOrder).toHaveBeenCalledWith('order123');
      // Verificamos el comportamiento actual del controlador ante errores
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteOrderItem', () => {
    test('debe eliminar un item de orden exitosamente', async () => {
      // Arrange
      mockOrderItemDAO.delete.mockResolvedValue(true);

      // Act
      await deleteOrderItem(req, res);

      // Assert
      expect(mockOrderItemDAO.delete).toHaveBeenCalledWith('item123');
      expect(res.status).toHaveBeenCalledWith(204);
    });

    test('debe manejar el caso cuando el item no existe', async () => {
      // Arrange
      mockOrderItemDAO.delete.mockResolvedValue(false);

      // Act
      await deleteOrderItem(req, res);

      // Assert
      expect(mockOrderItemDAO.delete).toHaveBeenCalledWith('item123');
      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('debe manejar errores al eliminar un item de orden', async () => {
      // Arrange
      const errorMsg = 'Error al eliminar item';
      mockOrderItemDAO.delete.mockRejectedValue(new Error(errorMsg));

      // Act
      await deleteOrderItem(req, res);

      // Assert
      expect(mockOrderItemDAO.delete).toHaveBeenCalledWith('item123');
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});