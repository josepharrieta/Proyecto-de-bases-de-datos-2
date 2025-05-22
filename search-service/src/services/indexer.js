import client from './elasticClient.js';

const INDEX = 'products';

export async function searchByText(query) {
  const { hits } = await client.search({
    index: INDEX,
    query: {
      multi_match: {
        query,
        fields: ['name', 'description', 'category']
      }
    }
  });
  return hits.hits.map(hit => hit._source);
}

export async function searchByCategory(categoria) {
  const { hits } = await client.search({
    index: INDEX,
    query: {
      match: {
        category: categoria
      }
    }
  });
  return hits.hits.map(hit => hit._source);
}

export async function reindex() {
  // Aquí podrías traer los productos de tu microservicio principal (con fetch o axios)
  const productos = [
    { id: 1, name: 'Pizza', description: 'Con queso', category: 'Italiana' },
    { id: 2, name: 'Sushi', description: '', category: 'Japonesa' },
  ];

  for (const p of productos) {
    await client.index({
      index: INDEX,
      id: p.id,
      document: {
        name: p.name,
        description: p.description || 'Producto sin descripción',
        category: p.category
      }
    });
  }

  await client.indices.refresh({ index: INDEX });
}
