import { searchProducts, reindexProducts } from '../services/elasticSearchService.js';

export const search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query parameter "q" is required' });
    
    const results = await searchProducts(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const reindex = async (req, res) => {
  try {
    // En producción, obtener productos de la DB principal
    const mockProducts = [
      { id: 1, name: 'Pizza', category: 'Italian', price: 10 },
      { id: 2, name: 'Sushi', category: 'Japanese', price: 15 }
    ];
    
    await reindexProducts(mockProducts);
    res.json({ message: 'Reindexing completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const results = await searchProductsByCategory(
      category, 
      parseInt(page), 
      parseInt(limit)
    );
    
    res.json({
      data: results.items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: results.total
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};