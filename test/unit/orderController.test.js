/*import * as orderController from '../../src/controllers/orderController.js';

afterEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

jest.mock('../../src/services/database/index.js', () => ({
  loadRepositories: () => ({
    orderRepository: {
      create: jest.fn(),
      getById: jest.fn(),
      updateStatus: jest.fn(),
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

describe('orderController', () => {
  const { orderRepository } = require('../../src/services/database/index.js').loadRepositories();

  afterEach(() => jest.clearAllMocks());

  describe('createOrder', () => {
    it('should create an order and return 201', async () => {
      const req = { body: { item: 'Pizza' }, user: { id: 5 } };
      const res = mockRes();
      orderRepository.create.mockResolvedValue({ id: 1, item: 'Pizza', userId: 5 });

      await orderController.createOrder(req, res);

      expect(orderRepository.create).toHaveBeenCalledWith({ item: 'Pizza', userId: 5 });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, item: 'Pizza', userId: 5 });
    });

    it('should handle errors and return 500', async () => {
      const req = { body: {}, user: { id: 1 } };
      const res = mockRes();
      orderRepository.create.mockRejectedValue(new Error('DB error'));

      await orderController.createOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('getOrderById', () => {
    it('should return order if found', async () => {
      const req = { params: { id: 2 } };
      const res = mockRes();
      orderRepository.getById.mockResolvedValue({ id: 2, item: 'Burger' });

      await orderController.getOrderById(req, res);

      expect(orderRepository.getById).toHaveBeenCalledWith(2);
      expect(res.json).toHaveBeenCalledWith({ id: 2, item: 'Burger' });
    });

    it('should return 404 if order not found', async () => {
      const req = { params: { id: 2 } };
      const res = mockRes();
      orderRepository.getById.mockResolvedValue(null);

      await orderController.getOrderById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { id: 2 } };
      const res = mockRes();
      orderRepository.getById.mockRejectedValue(new Error('DB error'));

      await orderController.getOrderById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('updateOrderStatus', () => {
    it('should update order status and return order', async () => {
      const req = { params: { id: 3 }, body: { status: 'delivered' } };
      const res = mockRes();
      orderRepository.updateStatus.mockResolvedValue({ id: 3, status: 'delivered' });

      await orderController.updateOrderStatus(req, res);

      expect(orderRepository.updateStatus).toHaveBeenCalledWith(3, 'delivered');
      expect(res.json).toHaveBeenCalledWith({ id: 3, status: 'delivered' });
    });

    it('should return 404 if order not found', async () => {
      const req = { params: { id: 3 }, body: { status: 'delivered' } };
      const res = mockRes();
      orderRepository.updateStatus.mockResolvedValue(null);

      await orderController.updateOrderStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { id: 3 }, body: { status: 'delivered' } };
      const res = mockRes();
      orderRepository.updateStatus.mockRejectedValue(new Error('DB error'));

      await orderController.updateOrderStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('deleteOrder', () => {
    it('should delete order and return 204', async () => {
      const req = { params: { id: 4 } };
      const res = mockRes();
      orderRepository.delete.mockResolvedValue(true);

      await orderController.deleteOrder(req, res);

      expect(orderRepository.delete).toHaveBeenCalledWith(4);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if order not found', async () => {
      const req = { params: { id: 4 } };
      const res = mockRes();
      orderRepository.delete.mockResolvedValue(false);

      await orderController.deleteOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { id: 4 } };
      const res = mockRes();
      orderRepository.delete.mockRejectedValue(new Error('DB error'));

      await orderController.deleteOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });
});
*/

// test/unit/orderController.test.js
import { jest } from '@jest/globals';

// Importamos el módulo a probar
// Asumiendo que tu controlador está en src/controllers/orderController.js
const orderControllerPath = '../../src/controllers/orderController';

// Mock para el repositorio
const mockOrderRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  updateStatus: jest.fn(),
  delete: jest.fn()
};

// Mock para loadRepositories
// Asumiendo que tu servicio está en src/services/database/index.js
jest.mock('../../src/services/database/index.js', () => ({
  loadRepositories: () => ({
    orderRepository: mockOrderRepository
  })
}));

// Importamos después de los mocks para que se apliquen correctamente
const { createOrder, getOrderById, updateOrderStatus, deleteOrder } = require(orderControllerPath);

describe('Order Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    // Resetear los mocks antes de cada prueba
    jest.clearAllMocks();
    
    // Configurar objetos request y response
    req = {
      body: { items: [{ productId: '123', quantity: 2 }], total: 100 },
      user: { id: 'user123' },
      params: { id: 'order123' }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createOrder', () => {
    test('debe crear una orden exitosamente', async () => {
      // Arrange
      const mockOrder = { 
        id: 'order123', 
        items: req.body.items, 
        total: req.body.total, 
        userId: req.user.id 
      };
      mockOrderRepository.create.mockResolvedValue(mockOrder);

      // Act
      await createOrder(req, res);

      // Assert
      expect(mockOrderRepository.create).toHaveBeenCalledWith({
        ...req.body,
        userId: req.user.id
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });

    test('debe manejar errores al crear una orden', async () => {
      // Arrange
      const errorMsg = 'Error al crear orden';
      mockOrderRepository.create.mockRejectedValue(new Error(errorMsg));

      // Act
      await createOrder(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('getOrderById', () => {
    test('debe obtener una orden exitosamente', async () => {
      // Arrange
      const mockOrder = { id: 'order123', status: 'pending' };
      mockOrderRepository.getById.mockResolvedValue(mockOrder);

      // Act
      await getOrderById(req, res);

      // Assert
      expect(mockOrderRepository.getById).toHaveBeenCalledWith('order123');
      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });

    test('debe retornar 404 si la orden no existe', async () => {
      // Arrange
      mockOrderRepository.getById.mockResolvedValue(null);

      // Act
      await getOrderById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    test('debe manejar errores al obtener una orden', async () => {
      // Arrange
      const errorMsg = 'Error al obtener orden';
      mockOrderRepository.getById.mockRejectedValue(new Error(errorMsg));

      // Act
      await getOrderById(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('updateOrderStatus', () => {
    test('debe actualizar el estado de una orden exitosamente', async () => {
      // Arrange
      req.body.status = 'completed';
      const mockUpdatedOrder = { id: 'order123', status: 'completed' };
      mockOrderRepository.updateStatus.mockResolvedValue(mockUpdatedOrder);

      // Act
      await updateOrderStatus(req, res);

      // Assert
      expect(mockOrderRepository.updateStatus).toHaveBeenCalledWith('order123', 'completed');
      expect(res.json).toHaveBeenCalledWith(mockUpdatedOrder);
    });

    test('debe retornar 404 si la orden a actualizar no existe', async () => {
      // Arrange
      req.body.status = 'completed';
      mockOrderRepository.updateStatus.mockResolvedValue(null);

      // Act
      await updateOrderStatus(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    test('debe manejar errores al actualizar una orden', async () => {
      // Arrange
      req.body.status = 'completed';
      const errorMsg = 'Error al actualizar orden';
      mockOrderRepository.updateStatus.mockRejectedValue(new Error(errorMsg));

      // Act
      await updateOrderStatus(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('deleteOrder', () => {
    test('debe eliminar una orden exitosamente', async () => {
      // Arrange
      mockOrderRepository.delete.mockResolvedValue(true);

      // Act
      await deleteOrder(req, res);

      // Assert
      expect(mockOrderRepository.delete).toHaveBeenCalledWith('order123');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test('debe retornar 404 si la orden a eliminar no existe', async () => {
      // Arrange
      mockOrderRepository.delete.mockResolvedValue(false);

      // Act
      await deleteOrder(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    test('debe manejar errores al eliminar una orden', async () => {
      // Arrange
      const errorMsg = 'Error al eliminar orden';
      mockOrderRepository.delete.mockRejectedValue(new Error(errorMsg));

      // Act
      await deleteOrder(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });
});