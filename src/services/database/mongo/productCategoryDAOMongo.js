import ProductCategory from '../../../models/mongoModels/ProductCategory.js';
import ProductCategoryDAO from '../daos/productCategoryDAO.js';

export default class ProductCategoryDAOMongo extends ProductCategoryDAO {
  async createCategory(categoryData) {
    return await ProductCategory.create(categoryData);
  }
  async getCategories() {
    return await ProductCategory.find();
  }
  async getProductsFromCategory(categoryId) {
    return await Product.find({ categoryId });
  }
  async updateCategory(id, updates) {
    return await ProductCategory.findByIdAndUpdate(id, updates, { new: true });
  }
  async deleteCategory(id) {
    const result = await ProductCategory.findByIdAndDelete(id);
    return !!result;
  }
}