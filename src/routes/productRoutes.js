import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { 
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById
} from '../controllers/productController.js';


const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin']), createProduct);
router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProductById);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteProduct);

export default router;