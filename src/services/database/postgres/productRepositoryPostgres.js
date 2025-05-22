import Product from '../../../models/postgresModels/Product.js';
import ProductRepository from '../repositories/productRepository.js'

export default class ProductRepositoryPostgres extends ProductRepository {
  async createProduct(productData) {
    return await Product.create(productData);
  }
  async getProducts() {
    return await Product.findAll();
  }
  async getProductById(id) {
    return await Product.findByPk(id);
  }
  async updateProduct(id, updates) {
    const product = await Product.findByPk(id);
    return product ? await product.update(updates) : null;
  }
  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    return product ? await product.destroy() : false;
  }
}