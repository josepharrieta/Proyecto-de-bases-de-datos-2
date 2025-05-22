import express from 'express';
import { connectElasticsearch } from './src/services/elasticSearchService.js';
import searchRoutes from './src/routes/searchRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Conexión a ElasticSearch
connectElasticsearch();
  
// Rutas
app.use('/search', searchRoutes);

app.listen(PORT, () => {
  console.log(`Search service running on port ${PORT}`);
});