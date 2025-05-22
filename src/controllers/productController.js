import { loadRepositories } from '../services/database/index.js';

const { productRepository } = loadRepositories();

export const createProduct = async (req, res) => {
  try {
    const product = await productRepository.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productRepository.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productRepository.getById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productRepository.getById(req.params.id);
    if (!product) return res.status(404).json({ message: 'No encontrado' });

    const updatedProduct = await productRepository.update(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productRepository.getById(req.params.id);
    if (!product) return res.status(404).json({ message: 'No encontrado' });

    await productRepository.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};