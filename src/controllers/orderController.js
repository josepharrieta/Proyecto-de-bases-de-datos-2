import { loadRepositories } from '../services/database/index.js';

const { orderRepository } = loadRepositories();

export const createOrder = async (req, res) => {
  try {
    const order = await orderRepository.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderRepository.getById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderRepository.updateStatus(req.params.id, req.body.status);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const success = await orderRepository.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Order not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};