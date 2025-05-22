import MenuItem from '../../../models/postgresModels/MenuItem.js';
import MenuItemDAO from '../daos/menuItemDAO.js';

export default class MenuItemDAOPostgres extends MenuItemDAO {
  async createMenuItem(itemData) {
    return await MenuItem.create(itemData);
  }
  async getItemsByMenu(menuId) {
    return await MenuItem.findAll({ where: { menuId } });
  }
  async deleteMenuItem(id) {
    const item = await MenuItem.findByPk(id);
    return item ? await item.destroy() : false;
  }
}