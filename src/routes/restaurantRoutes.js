import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { 
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurantController.js';


const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin']), createRestaurant);
router.get('/:id', authMiddleware, getRestaurantById);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateRestaurant);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteRestaurant);

export default router;