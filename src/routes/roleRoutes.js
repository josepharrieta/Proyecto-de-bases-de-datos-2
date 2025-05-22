import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { 
  createRole,
  getRoles,
  updateRole,
  deleteRole
} from '../controllers/roleController.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin']), createRole);
router.get('/', authMiddleware, getRoles);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateRole);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteRole);

export default router;