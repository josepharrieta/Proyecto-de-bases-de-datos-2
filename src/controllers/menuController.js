import { loadDaos } from '../services/database/index.js';

const { menuDAO } = loadDaos();

export const createMenu = async (req, res) => {
  try {
    const menu = await menuDAO.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const menu = await menuDAO.getById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const menu = await menuDAO.update(req.params.id, req.body);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const success = await menuDAO.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Menu not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};