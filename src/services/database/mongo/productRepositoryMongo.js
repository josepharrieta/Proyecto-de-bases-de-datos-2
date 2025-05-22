import Product from '../../../models/mongoModels/Product.js';
import ProductRepository from '../repositories/productRepository.js';

export default class ProductRepositoryMongo extends ProductRepository {
  async createProduct(productData) {
    return await Product.create(productData);
  }
  async getProducts() {
    return await Product.find();
  }
  async getProductById(id) {
    return await Product.findById(id);
  }
  async updateProduct(id, updates) {
    return await Product.findByIdAndUpdate(id, updates, { new: true });
  }
  async deleteProduct(id) {
    const result = await Product.findByIdAndDelete(id);
    return !!result;
  }
}