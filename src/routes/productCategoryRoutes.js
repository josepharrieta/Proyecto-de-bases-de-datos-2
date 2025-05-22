import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { 
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getProductsFromCategory
} from '../controllers/productCategoryController.js';

const router = express.Router();

router.post('/', authMiddleware, createCategory);
router.get('/:restaurantId/availability', authMiddleware, getCategories);
router.get('/:categoryId/products', getProductsFromCategory);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;