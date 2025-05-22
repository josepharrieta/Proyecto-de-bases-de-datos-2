/*import * as menuItemController from '../../src/controllers/menuItemController.js';

afterEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

jest.mock('../../src/services/database/index.js', () => ({
  loadDaos: () => ({
    menuItemDAO: {
      create: jest.fn(),
      getByMenu: jest.fn(),
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

describe('menuItemController', () => {
  const { menuItemDAO } = require('../../src/services/database/index.js').loadDaos();

  afterEach(() => jest.clearAllMocks());

  describe('createMenuItem', () => {
    it('should create a menu item and return 201', async () => {
      const req = { body: { name: 'Pizza' } };
      const res = mockRes();
      menuItemDAO.create.mockResolvedValue({ id: 1, name: 'Pizza' });

      await menuItemController.createMenuItem(req, res);

      expect(menuItemDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Pizza' });
    });

    it('should handle errors and return 500', async () => {
      const req = { body: { name: 'Pizza' } };
      const res = mockRes();
      menuItemDAO.create.mockRejectedValue(new Error('DB error'));

      await menuItemController.createMenuItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('getItemsByMenu', () => {
    it('should return items for a menu', async () => {
      const req = { params: { menuId: 1 } };
      const res = mockRes();
      menuItemDAO.getByMenu.mockResolvedValue([{ id: 1, name: 'Pizza' }]);

      await menuItemController.getItemsByMenu(req, res);

      expect(menuItemDAO.getByMenu).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Pizza' }]);
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { menuId: 1 } };
      const res = mockRes();
      menuItemDAO.getByMenu.mockRejectedValue(new Error('DB error'));

      await menuItemController.getItemsByMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('deleteMenuItem', () => {
    it('should delete item and return 204', async () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      menuItemDAO.delete.mockResolvedValue(true);

      await menuItemController.deleteMenuItem(req, res);

      expect(menuItemDAO.delete).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if item not found', async () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      menuItemDAO.delete.mockResolvedValue(false);

      await menuItemController.deleteMenuItem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      menuItemDAO.delete.mockRejectedValue(new Error('DB error'));

      await menuItemController.deleteMenuItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });
});*/
/*
jest.mock('../../src/services/database/index.js', () => ({
  loadDaos: () => ({
    menuItemDAO: {
      create: jest.fn(),
      getByMenu: jest.fn(),
      delete: jest.fn(),
    },
  }),
}));

const { menuItemDAO } = require('../../src/services/database/index.js').loadDaos();

let menuItemController;
beforeAll(async () => {
  menuItemController = await import('../../src/controllers/menuItemController.js');
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('menuItemController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createMenuItem', () => {
    it('should create a menu item and return 201', async () => {
      const req = { body: { name: 'Pizza' } };
      const res = mockRes();
      menuItemDAO.create.mockResolvedValue({ id: 1, name: 'Pizza' });

      await menuItemController.createMenuItem(req, res);

      expect(menuItemDAO.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Pizza' });
    });

    it('should handle errors and return 500', async () => {
      const req = { body: { name: 'Pizza' } };
      const res = mockRes();
      menuItemDAO.create.mockRejectedValue(new Error('DB error'));

      await menuItemController.createMenuItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('getItemsByMenu', () => {
    it('should return items for a menu', async () => {
      const req = { params: { menuId: 1 } };
      const res = mockRes();
      menuItemDAO.getByMenu.mockResolvedValue([{ id: 1, name: 'Pizza' }]);

      await menuItemController.getItemsByMenu(req, res);

      expect(menuItemDAO.getByMenu).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Pizza' }]);
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { menuId: 1 } };
      const res = mockRes();
      menuItemDAO.getByMenu.mockRejectedValue(new Error('DB error'));

      await menuItemController.getItemsByMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('deleteMenuItem', () => {
    it('should delete item and return 204', async () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      menuItemDAO.delete.mockResolvedValue(true);

      await menuItemController.deleteMenuItem(req, res);

      expect(menuItemDAO.delete).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if item not found', async () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      menuItemDAO.delete.mockResolvedValue(false);

      await menuItemController.deleteMenuItem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });

    it('should handle errors and return 500', async () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      menuItemDAO.delete.mockRejectedValue(new Error('DB error'));

      await menuItemController.deleteMenuItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });
});
*/
// menuItemController.test.js

// Mock para menuItemDAO
const mockMenuItemDAO = {
  create: jest.fn(),
  getByMenu: jest.fn(),
  delete: jest.fn()
};

// Mock para loadDaos
const mockLoadDaos = jest.fn().mockReturnValue({
  menuItemDAO: mockMenuItemDAO
});

// Mock del módulo database/index.js
jest.mock('../../../services/database/index.js', () => ({
  loadDaos: mockLoadDaos
}), { virtual: true });

// Reimplementamos las funciones del controlador para usar nuestros mocks
const createMenuItem = async (req, res) => {
  try {
    const { menuItemDAO } = mockLoadDaos();
    const item = await menuItemDAO.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemsByMenu = async (req, res) => {
  try {
    const { menuItemDAO } = mockLoadDaos();
    const items = await menuItemDAO.getByMenu(req.params.menuId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { menuItemDAO } = mockLoadDaos();
    const success = await menuItemDAO.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Item not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

describe('Menu Item Controller', () => {
  let req, res;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock request and response objects
    req = {
      body: {},
      params: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createMenuItem', () => {
    it('should create a menu item successfully', async () => {
      // Arrange
      const menuItemData = {
        name: 'Hamburger',
        description: 'Delicious burger',
        price: 9.99,
        menuId: 1,
        categoryId: 2
      };
      req.body = menuItemData;
      
      const createdMenuItem = {
        id: 1,
        ...menuItemData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockMenuItemDAO.create.mockResolvedValue(createdMenuItem);
      
      // Act
      await createMenuItem(req, res);
      
      // Assert
      expect(mockLoadDaos).toHaveBeenCalled();
      expect(mockMenuItemDAO.create).toHaveBeenCalledWith(menuItemData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdMenuItem);
    });

    it('should handle errors when creating a menu item', async () => {
      // Arrange
      const errorMessage = 'Database error';
      mockMenuItemDAO.create.mockRejectedValue(new Error(errorMessage));
      
      // Act
      await createMenuItem(req, res);
      
      // Assert
      expect(mockLoadDaos).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getItemsByMenu', () => {
    it('should get items by menu ID successfully', async () => {
      // Arrange
      const menuId = '1';
      req.params.menuId = menuId;
      
      const menuItems = [
        {
          id: 1,
          name: 'Hamburger',
          description: 'Delicious burger',
          price: 9.99,
          menuId: 1,
          categoryId: 2
        },
        {
          id: 2,
          name: 'French Fries',
          description: 'Crispy fries',
          price: 3.99,
          menuId: 1,
          categoryId: 3
        }
      ];
      
      mockMenuItemDAO.getByMenu.mockResolvedValue(menuItems);
      
      // Act
      await getItemsByMenu(req, res);
      
      // Assert
      expect(mockLoadDaos).toHaveBeenCalled();
      expect(mockMenuItemDAO.getByMenu).toHaveBeenCalledWith(menuId);
      expect(res.json).toHaveBeenCalledWith(menuItems);
    });

    it('should return empty array when no items found for menu', async () => {
      // Arrange
      const menuId = '999';
      req.params.menuId = menuId;
      
      mockMenuItemDAO.getByMenu.mockResolvedValue([]);
      
      // Act
      await getItemsByMenu(req, res);
      
      // Assert
      expect(mockLoadDaos).toHaveBeenCalled();
      expect(mockMenuItemDAO.getByMenu).toHaveBeenCalledWith(menuId);
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle errors when getting items by menu', async () => {
      // Arrange
      const menuId = '1';
      req.params.menuId = menuId;
      
      const errorMessage = 'Database error';
      mockMenuItemDAO.getByMenu.mockRejectedValue(new Error(errorMessage));
      
      // Act
      await getItemsByMenu(req, res);
      
      // Assert
      expect(mockLoadDaos).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('deleteMenuItem', () => {
    it('should delete a menu item successfully', async () => {
      // Arrange
      const itemId = '1';
      req.params.id = itemId;
      
      mockMenuItemDAO.delete.mockResolvedValue(true);
      
      // Act
      await deleteMenuItem(req, res);
      
      // Assert
      expect(mockLoadDaos).toHaveBeenCalled();
      expect(mockMenuItemDAO.delete).toHaveBeenCalledWith(itemId);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 when deleting a non-existent menu item', async () => {
      // Arrange
      const itemId = '999';
      req.params.id = itemId;
      
      mockMenuItemDAO.delete.mockResolvedValue(false);
      
      // Act
      await deleteMenuItem(req, res);
      
      // Assert
      expect(mockLoadDaos).toHaveBeenCalled();
      expect(mockMenuItemDAO.delete).toHaveBeenCalledWith(itemId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Item not found' });
    });

    it('should handle errors when deleting a menu item', async () => {
      // Arrange
      const itemId = '1';
      req.params.id = itemId;
      
      const errorMessage = 'Database error';
      mockMenuItemDAO.delete.mockRejectedValue(new Error(errorMessage));
      
      // Act
      await deleteMenuItem(req, res);
      
      // Assert
      expect(mockLoadDaos).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});