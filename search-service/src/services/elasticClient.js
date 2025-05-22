const { Client } = require('@elastic/elasticsearch');

class ElasticClient {
    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            const elasticUrl = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
            
            this.client = new Client({
                node: elasticUrl,
                requestTimeout: 60000,
                pingTimeout: 3000,
                maxRetries: 5,
                resurrectStrategy: 'ping'
            });

            // Test connection
            await this.client.ping();
            this.isConnected = true;
            console.log('Connected to Elasticsearch');

            // Initialize indices
            await this.initializeIndices();

        } catch (error) {
            console.error('Failed to connect to Elasticsearch:', error);
            this.isConnected = false;
            throw error;
        }
    }

    async initializeIndices() {
        const indices = [
            {
                index: 'products',
                mapping: {
                    properties: {
                        name: {
                            type: 'text',
                            analyzer: 'standard',
                            fields: {
                                keyword: { type: 'keyword' }
                            }
                        },
                        description: {
                            type: 'text',
                            analyzer: 'standard'
                        },
                        category: {
                            type: 'keyword'
                        },
                        price: {
                            type: 'float'
                        },
                        restaurant_id: {
                            type: 'keyword'
                        },
                        availability: {
                            type: 'boolean'
                        },
                        created_at: {
                            type: 'date'
                        },
                        updated_at: {
                            type: 'date'
                        }
                    }
                }
            }
        ];

        for (const indexConfig of indices) {
            try {
                const exists = await this.client.indices.exists({ index: indexConfig.index });
                
                if (!exists) {
                    await this.client.indices.create({
                        index: indexConfig.index,
                        body: {
                            mappings: indexConfig.mapping
                        }
                    });
                    console.log(`Created index: ${indexConfig.index}`);
                }
            } catch (error) {
                console.error(`Error creating index ${indexConfig.index}:`, error);
            }
        }
    }

    getClient() {
        if (!this.isConnected) {
            throw new Error('Elasticsearch client not connected');
        }
        return this.client;
    }

    async disconnect() {
        if (this.client) {
            await this.client.close();
            this.isConnected = false;
            console.log('Disconnected from Elasticsearch');
        }
    }

    async healthCheck() {
        try {
            const health = await this.client.cluster.health();
            return {
                status: health.status,
                cluster_name: health.cluster_name,
                number_of_nodes: health.number_of_nodes
            };
        } catch (error) {
            return { status: 'error', message: error.message };
        }
    }
}

module.exports = new ElasticClient();