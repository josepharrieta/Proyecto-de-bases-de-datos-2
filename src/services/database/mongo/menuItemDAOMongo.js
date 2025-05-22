import MenuItem from '../../../models/mongoModels/MenuItem.js';
import MenuItemDAO from '../daos/menuItemDAO.js';

export default class MenuItemDAOMongo extends MenuItemDAO {
  async createMenuItem(itemData) {
    return await MenuItem.create(itemData);
  }
  async getItemsByMenu(menuId) {
    return await MenuItem.find({ menuId });
  }
  async deleteMenuItem(id) {
    const result = await MenuItem.findByIdAndDelete(id);
    return !!result;
  }
}
