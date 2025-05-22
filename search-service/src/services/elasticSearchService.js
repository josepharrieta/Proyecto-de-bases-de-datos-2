const elasticClient = require('./elasticClient');

class ElasticSearchService {
    constructor() {
        this.client = elasticClient;
    }

    async searchProducts(query, options = {}) {
        try {
            const {
                category,
                restaurant_id,
                page = 1,
                limit = 10,
                sort = 'relevance'
            } = options;

            const from = (page - 1) * limit;
            
            const searchBody = {
                query: {
                    bool: {
                        must: [],
                        filter: []
                    }
                },
                from,
                size: limit,
                highlight: {
                    fields: {
                        name: {},
                        description: {}
                    }
                }
            };

            // Text search
            if (query && query.trim()) {
                searchBody.query.bool.must.push({
                    multi_match: {
                        query: query.trim(),
                        fields: ['name^2', 'description'],
                        type: 'best_fields',
                        fuzziness: 'AUTO'
                    }
                });
            } else {
                searchBody.query.bool.must.push({
                    match_all: {}
                });
            }

            // Category filter
            if (category) {
                searchBody.query.bool.filter.push({
                    term: { category: category }
                });
            }

            // Restaurant filter
            if (restaurant_id) {
                searchBody.query.bool.filter.push({
                    term: { restaurant_id: restaurant_id }
                });
            }

            // Only available products
            searchBody.query.bool.filter.push({
                term: { availability: true }
            });

            // Sorting
            if (sort === 'price_asc') {
                searchBody.sort = [{ price: { order: 'asc' } }];
            } else if (sort === 'price_desc') {
                searchBody.sort = [{ price: { order: 'desc' } }];
            } else if (sort === 'name') {
                searchBody.sort = [{ 'name.keyword': { order: 'asc' } }];
            }

            const response = await this.client.getClient().search({
                index: 'products',
                body: searchBody
            });

            return {
                hits: response.hits.hits.map(hit => ({
                    id: hit._id,
                    score: hit._score,
                    source: hit._source,
                    highlight: hit.highlight
                })),
                total: response.hits.total.value,
                took: response.took,
                page,
                limit,
                totalPages: Math.ceil(response.hits.total.value / limit)
            };

        } catch (error) {
            console.error('Search error:', error);
            throw new Error('Search operation failed');
        }
    }

    async searchByCategory(category, options = {}) {
        return this.searchProducts('', { ...options, category });
    }

    async indexProduct(product) {
        try {
            const doc = {
                name: product.name || '',
                description: product.description || 'Producto sin descripción',
                category: product.category || 'Sin categoría',
                price: parseFloat(product.price) || 0,
                restaurant_id: product.restaurant_id,
                availability: product.availability !== false,
                created_at: product.created_at || new Date(),
                updated_at: new Date()
            };

            const response = await this.client.getClient().index({
                index: 'products',
                id: product._id || product.id,
                body: doc
            });

            return response;
        } catch (error) {
            console.error('Index product error:', error);
            throw new Error('Failed to index product');
        }
    }

    async updateProduct(id, product) {
        try {
            const doc = {
                name: product.name || '',
                description: product.description || 'Producto sin descripción',
                category: product.category || 'Sin categoría',
                price: parseFloat(product.price) || 0,
                restaurant_id: product.restaurant_id,
                availability: product.availability !== false,
                updated_at: new Date()
            };

            const response = await this.client.getClient().update({
                index: 'products',
                id: id,
                body: {
                    doc: doc,
                    doc_as_upsert: true
                }
            });

            return response;
        } catch (error) {
            console.error('Update product error:', error);
            throw new Error('Failed to update product');
        }
    }

    async deleteProduct(id) {
        try {
            const response = await this.client.getClient().delete({
                index: 'products',
                id: id
            });

            return response;
        } catch (error) {
            console.error('Delete product error:', error);
            throw new Error('Failed to delete product');
        }
    }

    async bulkIndex(products) {
        try {
            const body = products.flatMap(product => [
                { index: { _index: 'products', _id: product._id || product.id } },
                {
                    name: product.name || '',
                    description: product.description || 'Producto sin descripción',
                    category: product.category || 'Sin categoría',
                    price: parseFloat(product.price) || 0,
                    restaurant_id: product.restaurant_id,
                    availability: product.availability !== false,
                    created_at: product.created_at || new Date(),
                    updated_at: new Date()
                }
            ]);

            const response = await this.client.getClient().bulk({
                body: body,
                refresh: true
            });

            if (response.errors) {
                const erroredDocuments = [];
                response.items.forEach((action, i) => {
                    const operation = Object.keys(action)[0];
                    if (action[operation].error) {
                        erroredDocuments.push({
                            status: action[operation].status,
                            error: action[operation].error,
                            operation: body[i * 2],
                            document: body[i * 2 + 1]
                        });
                    }
                });
                console.error('Bulk index errors:', erroredDocuments);
            }

            return {
                indexed: response.items.length,
                errors: response.errors,
                took: response.took
            };

        } catch (error) {
            console.error('Bulk index error:', error);
            throw new Error('Failed to bulk index products');
        }
    }

    async reindexFromDatabase() {
        try {
            // This would typically connect to your database and fetch all products
            // For now, we'll return a placeholder response
            const mongoose = require('mongoose');
            
            // Connect to MongoDB if not connected
            if (!mongoose.connection.readyState) {
                const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant_db';
                await mongoose.connect(mongoUri);
            }

            // Define a simple product schema for fetching
            const ProductSchema = new mongoose.Schema({}, { strict: false });
            const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

            // Fetch all products
            const products = await Product.find({}).lean();
            
            if (products.length > 0) {
                const result = await this.bulkIndex(products);
                return {
                    message: 'Reindexing completed',
                    processed: products.length,
                    ...result
                };
            } else {
                return {
                    message: 'No products found to reindex',
                    processed: 0
                };
            }

        } catch (error) {
            console.error('Reindex error:', error);
            throw new Error('Failed to reindex products from database');
        }
    }

    async getStats() {
        try {
            const stats = await this.client.getClient().indices.stats({
                index: 'products'
            });

            return {
                total_documents: stats.indices.products?.total?.docs?.count || 0,
                index_size: stats.indices.products?.total?.store?.size_in_bytes || 0,
                search_stats: stats.indices.products?.total?.search || {}
            };
        } catch (error) {
            console.error('Get stats error:', error);
            return { error: 'Failed to get search statistics' };
        }
    }
}

module.exports = new ElasticSearchService();