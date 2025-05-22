import { loadDaos } from '../services/database/index.js';

const { roleDAO } = loadDaos();

export const createRole = async (req, res) => {
  try {
    const role = await roleDAO.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await roleDAO.getAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const role = await roleDAO.update(req.params.id, req.body);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const success = await roleDAO.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Role not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};