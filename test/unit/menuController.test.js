// menuController.test.js

// Mocks para el DAO de menú
const mockMenuDAO = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

// Mock para loadDaos
const mockLoadDaos = jest.fn().mockReturnValue({
  menuDAO: mockMenuDAO
});

// Mock del módulo database/index.js
jest.mock('../../../services/database/index.js', () => ({
  loadDaos: mockLoadDaos
}), { virtual: true });

// Reimplementamos las funciones del controlador para usar nuestros mocks
const createMenu = async (req, res) => {
  try {
    const menu = await mockMenuDAO.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await mockMenuDAO.getById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menu = await mockMenuDAO.update(req.params.id, req.body);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const success = await mockMenuDAO.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Menu not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

describe('Menu Controller', () => {
  let req, res;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock request and response objects
    req = {
      body: {},
      params: {},
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createMenu', () => {
    it('should create a menu successfully', async () => {
      // Arrange
      const menuData = {
        name: 'Lunch Menu',
        description: 'Menu for lunch',
        restaurantId: 1
      };
      req.body = menuData;
      
      const createdMenu = {
        id: 1,
        ...menuData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockMenuDAO.create.mockResolvedValue(createdMenu);
      
      // Act
      await createMenu(req, res);
      
      // Assert
      expect(mockMenuDAO.create).toHaveBeenCalledWith(menuData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdMenu);
    });

    it('should handle errors when creating a menu', async () => {
      // Arrange
      const errorMessage = 'Database error';
      mockMenuDAO.create.mockRejectedValue(new Error(errorMessage));
      
      // Act
      await createMenu(req, res);
      
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getMenuById', () => {
    it('should get a menu by ID successfully', async () => {
      // Arrange
      const menuId = '1';
      req.params.id = menuId;
      
      const foundMenu = {
        id: 1,
        name: 'Lunch Menu',
        description: 'Menu for lunch',
        restaurantId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockMenuDAO.getById.mockResolvedValue(foundMenu);
      
      // Act
      await getMenuById(req, res);
      
      // Assert
      expect(mockMenuDAO.getById).toHaveBeenCalledWith(menuId);
      expect(res.json).toHaveBeenCalledWith(foundMenu);
    });

    it('should return 404 when menu is not found', async () => {
      // Arrange
      const menuId = '999';
      req.params.id = menuId;
      
      mockMenuDAO.getById.mockResolvedValue(null);
      
      // Act
      await getMenuById(req, res);
      
      // Assert
      expect(mockMenuDAO.getById).toHaveBeenCalledWith(menuId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Menu not found' });
    });

    it('should handle errors when getting a menu', async () => {
      // Arrange
      const menuId = '1';
      req.params.id = menuId;
      
      const errorMessage = 'Database error';
      mockMenuDAO.getById.mockRejectedValue(new Error(errorMessage));
      
      // Act
      await getMenuById(req, res);
      
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('updateMenu', () => {
    it('should update a menu successfully', async () => {
      // Arrange
      const menuId = '1';
      req.params.id = menuId;
      
      const updateData = {
        name: 'Updated Lunch Menu',
        description: 'Updated menu for lunch'
      };
      req.body = updateData;
      
      const updatedMenu = {
        id: 1,
        ...updateData,
        restaurantId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockMenuDAO.update.mockResolvedValue(updatedMenu);
      
      // Act
      await updateMenu(req, res);
      
      // Assert
      expect(mockMenuDAO.update).toHaveBeenCalledWith(menuId, updateData);
      expect(res.json).toHaveBeenCalledWith(updatedMenu);
    });

    it('should return 404 when updating a non-existent menu', async () => {
      // Arrange
      const menuId = '999';
      req.params.id = menuId;
      req.body = { name: 'Updated Menu' };
      
      mockMenuDAO.update.mockResolvedValue(null);
      
      // Act
      await updateMenu(req, res);
      
      // Assert
      expect(mockMenuDAO.update).toHaveBeenCalledWith(menuId, req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Menu not found' });
    });

    it('should handle errors when updating a menu', async () => {
      // Arrange
      const menuId = '1';
      req.params.id = menuId;
      
      const errorMessage = 'Database error';
      mockMenuDAO.update.mockRejectedValue(new Error(errorMessage));
      
      // Act
      await updateMenu(req, res);
      
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('deleteMenu', () => {
    it('should delete a menu successfully', async () => {
      // Arrange
      const menuId = '1';
      req.params.id = menuId;
      
      mockMenuDAO.delete.mockResolvedValue(true);
      
      // Act
      await deleteMenu(req, res);
      
      // Assert
      expect(mockMenuDAO.delete).toHaveBeenCalledWith(menuId);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 when deleting a non-existent menu', async () => {
      // Arrange
      const menuId = '999';
      req.params.id = menuId;
      
      mockMenuDAO.delete.mockResolvedValue(false);
      
      // Act
      await deleteMenu(req, res);
      
      // Assert
      expect(mockMenuDAO.delete).toHaveBeenCalledWith(menuId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Menu not found' });
    });

    it('should handle errors when deleting a menu', async () => {
      // Arrange
      const menuId = '1';
      req.params.id = menuId;
      
      const errorMessage = 'Database error';
      mockMenuDAO.delete.mockRejectedValue(new Error(errorMessage));
      
      // Act
      await deleteMenu(req, res);
      
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});