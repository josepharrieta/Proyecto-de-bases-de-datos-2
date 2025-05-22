
// productController.test.js
// Primero creamos el mock antes de cualquier importación
jest.mock('../../src/services/database/index.js', () => {
  const mockProductRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };
  
  return {
    loadRepositories: jest.fn(() => ({ productRepository: mockProductRepository }))
  };
});

// Después importamos los controladores
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../../src/controllers/productController.js';

// Y la función mockeada para poder manipularla en los tests
import { loadRepositories } from '../../src/services/database/index.js';

describe('Product Controller', () => {
  let mockRequest;
  let mockResponse;
  let productRepository;
  
  beforeEach(() => {
    // Obtener la referencia al repositorio mockeado
    productRepository = loadRepositories().productRepository;
    
    // Resetear todos los mocks
    jest.clearAllMocks();
    
    // Configurar mocks para req y res
    mockRequest = {
      body: {},
      params: {}
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });
  
  describe('createProduct', () => {
    test('debería crear un producto y devolver código 201', async () => {
      // Arrange
      const productData = { name: 'Producto Test', price: 100 };
      mockRequest.body = productData;
      const createdProduct = { id: '1', ...productData };
      productRepository.create.mockResolvedValue(createdProduct);
      
      // Act
      await createProduct(mockRequest, mockResponse);
      
      // Assert
      expect(productRepository.create).toHaveBeenCalledWith(productData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdProduct);
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      productRepository.create.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await createProduct(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
  
  describe('getProducts', () => {
    test('debería devolver todos los productos', async () => {
      // Arrange
      const products = [
        { id: '1', name: 'Producto 1', price: 100 },
        { id: '2', name: 'Producto 2', price: 200 }
      ];
      productRepository.getAll.mockResolvedValue(products);
      
      // Act
      await getProducts(mockRequest, mockResponse);
      
      // Assert
      expect(productRepository.getAll).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(products);
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      productRepository.getAll.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await getProducts(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
  
  describe('getProductById', () => {
    test('debería devolver un producto cuando existe', async () => {
      // Arrange
      const productId = '1';
      mockRequest.params.id = productId;
      const product = { id: productId, name: 'Producto Test', price: 100 };
      productRepository.getById.mockResolvedValue(product);
      
      // Act
      await getProductById(mockRequest, mockResponse);
      
      // Assert
      expect(productRepository.getById).toHaveBeenCalledWith(productId);
      expect(mockResponse.json).toHaveBeenCalledWith(product);
    });
    
    test('debería devolver código 404 cuando el producto no existe', async () => {
      // Arrange
      mockRequest.params.id = '999';
      productRepository.getById.mockResolvedValue(null);
      
      // Act
      await getProductById(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Producto no encontrado' });
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      mockRequest.params.id = '1';
      productRepository.getById.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await getProductById(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
  
  describe('updateProduct', () => {
    test('debería actualizar un producto cuando existe', async () => {
      // Arrange
      const productId = '1';
      mockRequest.params.id = productId;
      const updateData = { name: 'Producto Actualizado', price: 150 };
      mockRequest.body = updateData;
      const existingProduct = { id: productId, name: 'Producto Antiguo', price: 100 };
      const updatedProduct = { id: productId, ...updateData };
      
      productRepository.getById.mockResolvedValue(existingProduct);
      productRepository.update.mockResolvedValue(updatedProduct);
      
      // Act
      await updateProduct(mockRequest, mockResponse);
      
      // Assert
      expect(productRepository.getById).toHaveBeenCalledWith(productId);
      expect(productRepository.update).toHaveBeenCalledWith(productId, updateData);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedProduct);
    });
    
    test('debería devolver código 404 cuando el producto no existe', async () => {
      // Arrange
      mockRequest.params.id = '999';
      productRepository.getById.mockResolvedValue(null);
      
      // Act
      await updateProduct(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No encontrado' });
      expect(productRepository.update).not.toHaveBeenCalled();
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      mockRequest.params.id = '1';
      productRepository.getById.mockResolvedValue({ id: '1', name: 'Producto', price: 100 });
      productRepository.update.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await updateProduct(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
  
  describe('deleteProduct', () => {
    test('debería eliminar un producto cuando existe y devolver código 204', async () => {
      // Arrange
      const productId = '1';
      mockRequest.params.id = productId;
      productRepository.getById.mockResolvedValue({ id: productId, name: 'Producto', price: 100 });
      productRepository.delete.mockResolvedValue();
      
      // Act
      await deleteProduct(mockRequest, mockResponse);
      
      // Assert
      expect(productRepository.getById).toHaveBeenCalledWith(productId);
      expect(productRepository.delete).toHaveBeenCalledWith(productId);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
    
    test('debería devolver código 404 cuando el producto no existe', async () => {
      // Arrange
      mockRequest.params.id = '999';
      productRepository.getById.mockResolvedValue(null);
      
      // Act
      await deleteProduct(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No encontrado' });
      expect(productRepository.delete).not.toHaveBeenCalled();
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      mockRequest.params.id = '1';
      productRepository.getById.mockResolvedValue({ id: '1', name: 'Producto', price: 100 });
      productRepository.delete.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await deleteProduct(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
});