import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { 
  createMenuItem,
  getItemsByMenu,
  deleteMenuItem
} from '../controllers/menuItemController.js';

const router = express.Router();

router.post('/', authMiddleware, createMenuItem);
router.get('/:menuId/items', authMiddleware, getItemsByMenu);
router.delete('/:id', authMiddleware, deleteMenuItem);

export default router;