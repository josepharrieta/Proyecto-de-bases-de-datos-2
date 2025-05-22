import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { 
  createOrderItem,
  getItemsByOrder,
  deleteOrderItem
} from '../controllers/orderItemController.js';

const router = express.Router();

router.post('/:orderId/items', authMiddleware, createOrderItem);
router.get('/:orderId/items', authMiddleware, getItemsByOrder);
router.delete('/:id', authMiddleware, deleteOrderItem);

export default router;