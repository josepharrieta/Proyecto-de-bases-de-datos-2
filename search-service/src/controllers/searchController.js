const elasticSearchService = require('../services/elasticSearchService');

class SearchController {
    async searchProducts(req, res) {
        try {
            const { q: query, category, restaurant_id, page, limit, sort } = req.query;

            const options = {
                category,
                restaurant_id,
                page: parseInt(page) || 1,
                limit: Math.min(parseInt(limit) || 10, 100), // Max 100 results per page
                sort
            };

            const results = await elasticSearchService.searchProducts(query, options);

            res.json({
                success: true,
                data: results,
                query: {
                    text: query,
                    ...options
                }
            });

        } catch (error) {
            console.error('Search products error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to search products',
                message: error.message
            });
        }
    }

    async searchByCategory(req, res) {
        try {
            const { categoria: category } = req.params;
            const { page, limit, sort } = req.query;

            if (!category) {
                return res.status(400).json({
                    success: false,
                    error: 'Category parameter is required'
                });
            }

            const options = {
                page: parseInt(page) || 1,
                limit: Math.min(parseInt(limit) || 10, 100),
                sort
            };

            const results = await elasticSearchService.searchByCategory(category, options);

            res.json({
                success: true,
                data: results,
                category
            });

        } catch (error) {
            console.error('Search by category error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to search by category',
                message: error.message
            });
        }
    }

    async reindex(req, res) {
        try {
            const result = await elasticSearchService.reindexFromDatabase();

            res.json({
                success: true,
                data: result
            });

        } catch (error) {
            console.error('Reindex error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to reindex products',
                message: error.message
            });
        }
    }

    async indexProduct(req, res) {
        try {
            const product = req.body;

            if (!product.name) {
                return res.status(400).json({
                    success: false,
                    error: 'Product name is required'
                });
            }

            const result = await elasticSearchService.indexProduct(product);

            res.status(201).json({
                success: true,
                data: result,
                message: 'Product indexed successfully'
            });

        } catch (error) {
            console.error('Index product error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to index product',
                message: error.message
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const product = req.body;

            const result = await elasticSearchService.updateProduct(id, product);

            res.json({
                success: true,
                data: result,
                message: 'Product updated successfully'
            });

        } catch (error) {
            console.error('Update product error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update product',
                message: error.message
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            const result = await elasticSearchService.deleteProduct(id);

            res.json({
                success: true,
                data: result,
                message: 'Product deleted successfully'
            });

        } catch (error) {
            console.error('Delete product error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to delete product',
                message: error.message
            });
        }
    }

    async getStats(req, res) {
        try {
            const stats = await elasticSearchService.getStats();

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {
            console.error('Get stats error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to get search statistics',
                message: error.message
            });
        }
    }

    async healthCheck(req, res) {
        try {
            const health = await elasticSearchService.client.healthCheck();

            res.json({
                success: true,
                data: health,
                service: 'search-service'
            });

        } catch (error) {
            console.error('Health check error:', error);
            res.status(500).json({
                success: false,
                error: 'Health check failed',
                message: error.message
            });
        }
    }
}

module.exports = new SearchController();