import { loadRepositories } from '../services/database/index.js';

const { restaurantRepository } = loadRepositories();

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantRepository.create({
      ...req.body,
      ownerId: req.user.id
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurantRepository.getById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantRepository.update(req.params.id, req.body);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const success = await restaurantRepository.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Restaurant not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};