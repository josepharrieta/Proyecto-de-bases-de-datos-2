import { loadDaos } from '../services/database/index.js';



export const createMenuItem = async (req, res) => {
  try {
    const { menuItemDAO } = loadDaos();
    const item = await menuItemDAO.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getItemsByMenu = async (req, res) => {
  try {
    const { menuItemDAO } = loadDaos();
    const items = await menuItemDAO.getByMenu(req.params.menuId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { menuItemDAO } = loadDaos();
    const success = await menuItemDAO.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Item not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};