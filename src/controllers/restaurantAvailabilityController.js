import { loadDaos } from '../services/database/index.js';

const { restaurantAvailabilityDAO } = loadDaos();

export const createAvailability = async (req, res) => {
  try {
    const availability = await restaurantAvailabilityDAO.create(req.body);
    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvailabilitiesByRestaurant = async (req, res) => {
  try {
    const availabilities = await restaurantAvailabilityDAO.getByRestaurant(req.params.restaurantId);
    res.json(availabilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const availability = await restaurantAvailabilityDAO.update(req.params.id, req.body);
    if (!availability) return res.status(404).json({ message: "Availability not found" });
    res.json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAvailability = async (req, res) => {
  try {
    const success = await restaurantAvailabilityDAO.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Availability not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};