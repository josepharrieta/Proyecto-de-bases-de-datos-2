// Controlador básico para search-service

export const search = async (req, res) => {
  // Lógica de búsqueda (puedes conectar a ElasticSearch aquí)
  res.json({ message: 'search endpoint', query: req.query });
};

export const searchByCategory = async (req, res) => {
  // Lógica de búsqueda por categoría
  res.json({ message: 'search by category', category: req.params.category });
};

export const reindex = async (req, res) => {
  // Lógica de reindexado
  res.json({ message: 'reindex endpoint' });
};