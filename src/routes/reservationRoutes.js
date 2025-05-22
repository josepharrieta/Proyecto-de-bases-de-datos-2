import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { 
  createReservation,
  getReservationById,
  getReservationsByUser,
  deleteReservation,
  updateReservationStatus
} from '../controllers/reservationController.js';

const router = express.Router();

router.post('/', authMiddleware, createReservation);
router.get('/:id', authMiddleware, getReservationById);
router.get('/user/:userId', authMiddleware, getReservationsByUser);
router.put('/:id/status', authMiddleware, updateReservationStatus);
router.delete('/:id', authMiddleware, deleteReservation);

export default router;