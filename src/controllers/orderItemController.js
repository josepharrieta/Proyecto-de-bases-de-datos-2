import { loadDaos } from '../services/database/index.js';

const { orderItemDAO } = loadDaos();

export const createOrderItem = async (req, res) => {
  try {
    const item = await orderItemDAO.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getItemsByOrder = async (req, res) => {
  try {
    const items = await orderItemDAO.getByOrder(req.params.orderId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrderItem = async (req, res) => {
  try {
    const success = await orderItemDAO.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Item not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};