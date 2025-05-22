import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { search, reindex, searchByCategory } from '../controllers/searchController.js';

const router = express.Router();

router.get('/products', authMiddleware, search);
router.get('/products/category/:category', authMiddleware, searchByCategory);
router.post('/reindex', authMiddleware, reindex);


export default router;