import express from 'express';
import { 
  createMenu, 
  getMenuById, 
  updateMenu, 
  deleteMenu 
} from '../controllers/menuController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createMenu);
router.get('/:id', getMenuById);
router.put('/:id', authMiddleware, updateMenu);
router.delete('/:id', authMiddleware, deleteMenu);

export default router;