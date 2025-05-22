// src/routes/mainRoutes.js
import express from 'express';

import userRoutes from './userRoutes.js';
import menuRoutes from './menuRoutes.js';
import menuItemRoutes from './menuItemRoutes.js';
import orderRoutes from './orderRoutes.js';
import orderItemRoutes from './orderItemRoutes.js';
import productCategoryRoutes from './productCategoryRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import restaurantRoutes from './restaurantRoutes.js';
import restaurantAvailabilityRoutes from './restaurantAvailabilityRoutes.js';
import roleRoutes from './roleRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/menus', menuRoutes);
router.use('/menu-items', menuItemRoutes);
router.use('/orders', orderRoutes);
router.use('/order-items', orderItemRoutes);
router.use('/categories', productCategoryRoutes);
router.use('/reservations', reservationRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/availability', restaurantAvailabilityRoutes);
router.use('/roles', roleRoutes);

export default router;
