import { searchProducts } from './elasticsearchService.js';

export const searchWithCache = async (query, cacheKey) => {
  const cached = await cache.get(cacheKey);
  if (cached) return cached;

  const results = await searchProducts(query);
  await cache.set(cacheKey, results);
  return results;
};