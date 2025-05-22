const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

// Search endpoints as specified in requirements
router.get('/products', searchController.searchProducts);
router.get('/products/category/:categoria', searchController.searchByCategory);
router.post('/reindex', searchController.reindex);

// Additional management endpoints
router.post('/products', searchController.indexProduct);
router.put('/products/:id', searchController.updateProduct);
router.delete('/products/:id', searchController.deleteProduct);

// Stats and health
router.get('/stats', searchController.getStats);
router.get('/health', searchController.healthCheck);

module.exports = router;