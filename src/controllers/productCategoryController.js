import { loadDaos } from '../services/database/index.js';

const { productCategoryDAO } = loadDaos();

export const createCategory = async (req, res) => {
  try {
    const category = await productCategoryDAO.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await productCategoryDAO.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsFromCategory = async (req, res) => {
  try {
    const products = await productCategoryDAO.getProductsFromCategory(req.params.categoryId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await productCategoryDAO.update(req.params.id, req.body);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const success = await productCategoryDAO.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Category not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};