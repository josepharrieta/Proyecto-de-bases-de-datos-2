import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { 
  createAvailability,
  getAvailabilitiesByRestaurant,
  updateAvailability,
  deleteAvailability
} from '../controllers/restaurantAvailabilityController.js';

const router = express.Router();

router.post('/', authMiddleware, createAvailability);
router.get('/:restaurantId/availability', authMiddleware, getAvailabilitiesByRestaurant);
router.put('/:id', authMiddleware, updateAvailability);
router.delete('/:id', authMiddleware, deleteAvailability);

export default router;