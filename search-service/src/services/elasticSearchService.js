import { Client } from '@elastic/elasticsearch';

const client = new Client({ 
  node: process.env.ELASTICSEARCH_URL
});

// Conexión y creación de índices
export const connectElasticsearch = async () => {
  try {
    await client.ping();
    console.log('Connected to ElasticSearch');
    
    // Crear índice si no existe
    const indexExists = await client.indices.exists({ index: 'products' });
    if (!indexExists) {
      await client.indices.create({
        index: 'products',
        body: {
          mappings: {
            properties: {
              name: { type: 'text' },
              description: { type: 'text' },
              category: { type: 'keyword' }
            }
          }
        }
      });
    }
  } catch (err) {
    console.error('ElasticSearch connection error:', err);
  }
};

// Indexar un producto
export const indexProduct = async (product) => {
  await client.index({
    index: 'products',
    body: {
      id: product.id,
      name: product.name,
      description: product.description || 'Sin descripción',
      category: product.category,
      price: product.price
    }
  });
};

// Buscar productos
export const searchProducts = async (query) => {
  const { body } = await client.search({
    index: 'products',
    body: {
      query: {
        multi_match: {
          query,
          fields: ['name^3', 'description', 'category']
        }
      }
    }
  });
  return body.hits.hits.map(hit => hit._source);
};

export const searchProductsByCategory = async (category, page = 1, size = 10) => {
  const from = (page - 1) * size;
  
  const { body } = await client.search({
    index: 'products',
    from,
    size,
    body: {
      query: {
        term: { "category.keyword": category }
      },
      aggs: {
        total_count: {
          value_count: {
            field: "category.keyword"
          }
        }
      }
    }
  });
  
  return {
    items: body.hits.hits.map(hit => hit._source),
    total: body.aggregations?.total_count?.value || 0
  };
};

// Reindexar todos los productos
export const reindexProducts = async (products) => {
  await client.indices.delete({ index: 'products' });
  await connectElasticsearch();
  for (const product of products) {
    await indexProduct(product);
  }
};