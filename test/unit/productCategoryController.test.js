/*import * as productCategoryController from '../../src/controllers/productCategoryController.js';

afterEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

jest.mock('../../src/services/database/index.js', () => ({
  loadDaos: () => ({
    productCategoryDAO: {
      create: jest.fn(),
      getAll: jest.fn(),
      getProductsFromCategory: jest.fn(),
      update: jest.fn(),
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

describe('productCategoryController', () => {
  const { productCategoryDAO } = require('../../src/services/database/index.js').loadDaos();

  afterEach(() => jest.clearAllMocks());

  describe('createCategory', () => {
    it('should create a category and return 201', async () => {
      const req = { body: { name: 'Bebidas' } };
      const res = mockRes();
      productCategoryDAO.create.mockResolvedValue({ id: 1, name: 'Bebidas' });

      await productCategoryController.createCategory(req, res);

      expect(productCategoryDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Bebidas' });
    });

    it('should handle errors and return 500', async () => {
      const req = { body: {} };
      const res = mockRes();
      productCategoryDAO.create.mockRejectedValue(new Error('DB error'));

      await productCategoryController.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('getCategories', () => {
    it('should return all categories', async () => {
      const req = {};
      const res = mockRes();
      productCategoryDAO.getAll.mockResolvedValue([{ id: 1, name: 'Bebidas' }]);

      await productCategoryController.getCategories(req, res);

      expect(productCategoryDAO.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Bebidas' }]);
    });

    it('should handle errors and return 500', async () => {
      const req = {};
      const res = mockRes();
      productCategoryDAO.getAll.mockRejectedValue(new Error('DB error'));

      await productCategoryController.getCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('getProductsFromCategory', () => {
    it('should return products from a category', async () => {
      const req = { params: { categoryId: 2 } };
      const res = mockRes();
      productCategoryDAO.getProductsFromCategory.mockResolvedValue([{ id: 10, name: 'Coca Cola' }]);

      await productCategoryController.getProductsFromCategory(req, res);

      expect(productCategoryDAO.getProductsFromCategory).toHaveBeenCalledWith(2);
      expect(res.json).toHaveBeenCalledWith([{ id: 10, name: 'Coca Cola' }]);
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { categoryId: 2 } };
      const res = mockRes();
      productCategoryDAO.getProductsFromCategory.mockRejectedValue(new Error('DB error'));

      await productCategoryController.getProductsFromCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('updateCategory', () => {
    it('should update a category and return it', async () => {
      const req = { params: { id: 3 }, body: { name: 'Snacks' } };
      const res = mockRes();
      productCategoryDAO.update.mockResolvedValue({ id: 3, name: 'Snacks' });

      await productCategoryController.updateCategory(req, res);

      expect(productCategoryDAO.update).toHaveBeenCalledWith(3, req.body);
      expect(res.json).toHaveBeenCalledWith({ id: 3, name: 'Snacks' });
    });

    it('should return 404 if category not found', async () => {
      const req = { params: { id: 3 }, body: { name: 'Snacks' } };
      const res = mockRes();
      productCategoryDAO.update.mockResolvedValue(null);

      await productCategoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { id: 3 }, body: { name: 'Snacks' } };
      const res = mockRes();
      productCategoryDAO.update.mockRejectedValue(new Error('DB error'));

      await productCategoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category and return 204', async () => {
      const req = { params: { id: 4 } };
      const res = mockRes();
      productCategoryDAO.delete.mockResolvedValue(true);

      await productCategoryController.deleteCategory(req, res);

      expect(productCategoryDAO.delete).toHaveBeenCalledWith(4);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if category not found', async () => {
      const req = { params: { id: 4 } };
      const res = mockRes();
      productCategoryDAO.delete.mockResolvedValue(false);

      await productCategoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { id: 4 } };
      const res = mockRes();
      productCategoryDAO.delete.mockRejectedValue(new Error('DB error'));

      await productCategoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });
});
*/
// test/unit/productCategoryController.test.js
import { jest } from '@jest/globals';

// Mock para el DAO
const mockProductCategoryDAO = {
  create: jest.fn(),
  getAll: jest.fn(),
  getProductsFromCategory: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

// Mock para loadDaos
jest.mock('../../src/services/database/index.js', () => ({
  loadDaos: () => ({
    productCategoryDAO: mockProductCategoryDAO
  })
}));

// Importamos después de los mocks para que se apliquen correctamente
const productCategoryControllerPath = '../../src/controllers/productCategoryController';
const { 
  createCategory, 
  getCategories, 
  getProductsFromCategory, 
  updateCategory, 
  deleteCategory 
} = require(productCategoryControllerPath);

describe('Product Category Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    // Resetear los mocks antes de cada prueba
    jest.clearAllMocks();
    
    // Configurar objetos request y response
    req = {
      body: { name: 'Electronics', description: 'Electronic devices and gadgets' },
      params: { 
        id: 'cat123',
        categoryId: 'cat123'
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createCategory', () => {
    test('debe crear una categoría exitosamente', async () => {
      // Arrange
      const mockCategory = { 
        id: 'cat123', 
        name: 'Electronics', 
        description: 'Electronic devices and gadgets'
      };
      mockProductCategoryDAO.create.mockResolvedValue(mockCategory);

      // Act
      await createCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCategory);
    });

    test('debe manejar errores al crear una categoría', async () => {
      // Arrange
      const errorMsg = 'Error al crear categoría';
      mockProductCategoryDAO.create.mockRejectedValue(new Error(errorMsg));

      // Act
      await createCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('getCategories', () => {
    test('debe obtener todas las categorías exitosamente', async () => {
      // Arrange
      const mockCategories = [
        { id: 'cat123', name: 'Electronics', description: 'Electronic devices and gadgets' },
        { id: 'cat456', name: 'Books', description: 'Printed and digital books' }
      ];
      mockProductCategoryDAO.getAll.mockResolvedValue(mockCategories);

      // Act
      await getCategories(req, res);

      // Assert
      expect(mockProductCategoryDAO.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    test('debe manejar errores al obtener categorías', async () => {
      // Arrange
      const errorMsg = 'Error al obtener categorías';
      mockProductCategoryDAO.getAll.mockRejectedValue(new Error(errorMsg));

      // Act
      await getCategories(req, res);

      // Assert
      expect(mockProductCategoryDAO.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('getProductsFromCategory', () => {
    test('debe obtener productos de una categoría exitosamente', async () => {
      // Arrange
      const mockProducts = [
        { id: 'prod123', name: 'Smartphone', price: 599.99, categoryId: 'cat123' },
        { id: 'prod456', name: 'Laptop', price: 1299.99, categoryId: 'cat123' }
      ];
      mockProductCategoryDAO.getProductsFromCategory.mockResolvedValue(mockProducts);

      // Act
      await getProductsFromCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.getProductsFromCategory).toHaveBeenCalledWith('cat123');
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    test('debe manejar errores al obtener productos de una categoría', async () => {
      // Arrange
      const errorMsg = 'Error al obtener productos';
      mockProductCategoryDAO.getProductsFromCategory.mockRejectedValue(new Error(errorMsg));

      // Act
      await getProductsFromCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.getProductsFromCategory).toHaveBeenCalledWith('cat123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('updateCategory', () => {
    test('debe actualizar una categoría exitosamente', async () => {
      // Arrange
      const mockUpdatedCategory = { 
        id: 'cat123', 
        name: 'Updated Electronics', 
        description: 'Updated description' 
      };
      mockProductCategoryDAO.update.mockResolvedValue(mockUpdatedCategory);

      // Act
      await updateCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.update).toHaveBeenCalledWith('cat123', req.body);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedCategory);
    });

    test('debe retornar 404 si la categoría a actualizar no existe', async () => {
      // Arrange
      mockProductCategoryDAO.update.mockResolvedValue(null);

      // Act
      await updateCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.update).toHaveBeenCalledWith('cat123', req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    test('debe manejar errores al actualizar una categoría', async () => {
      // Arrange
      const errorMsg = 'Error al actualizar categoría';
      mockProductCategoryDAO.update.mockRejectedValue(new Error(errorMsg));

      // Act
      await updateCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.update).toHaveBeenCalledWith('cat123', req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });

  describe('deleteCategory', () => {
    test('debe eliminar una categoría exitosamente', async () => {
      // Arrange
      mockProductCategoryDAO.delete.mockResolvedValue(true);

      // Act
      await deleteCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.delete).toHaveBeenCalledWith('cat123');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test('debe retornar 404 si la categoría a eliminar no existe', async () => {
      // Arrange
      mockProductCategoryDAO.delete.mockResolvedValue(false);

      // Act
      await deleteCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.delete).toHaveBeenCalledWith('cat123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    test('debe manejar errores al eliminar una categoría', async () => {
      // Arrange
      const errorMsg = 'Error al eliminar categoría';
      mockProductCategoryDAO.delete.mockRejectedValue(new Error(errorMsg));

      // Act
      await deleteCategory(req, res);

      // Assert
      expect(mockProductCategoryDAO.delete).toHaveBeenCalledWith('cat123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });
  });
});