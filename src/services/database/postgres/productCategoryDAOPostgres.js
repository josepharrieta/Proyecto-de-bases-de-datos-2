import ProductCategory from '../../../models/postgresModels/ProductCategory.js';
import ProductCategoryDAO from '../daos/productCategoryDAO.js';

export default class ProductCategoryDAOPostgres extends ProductCategoryDAO {
  async createCategory(categoryData) {
    return await ProductCategory.create(categoryData);
  }
  async getCategories() {
    return await ProductCategory.findAll();
  }
  async getProductsFromCategory(categoryId) {
    return await Product.findAll({ where: { categoryId } });
  }
  async updateCategory(id, updates) {
    const category = await ProductCategory.findByPk(id);
    return category ? await category.update(updates) : null;
  }
  async deleteCategory(id) {
    const category = await ProductCategory.findByPk(id);
    return category ? await category.destroy() : false;
  }
}