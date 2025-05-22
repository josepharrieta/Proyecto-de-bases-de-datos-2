import Menu from '../../../models/mongoModels/Menu.js';
import MenuDAO from '../daos/menuDAO.js';

export default class MenuDAOMongo extends MenuDAO {
  async createMenu(data) {
    return await Menu.create(data);
  }

  async getMenuById(id) {
    return await Menu.findById(id);
  }

  async updateMenu(id, updates) {
    return await Menu.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteMenu(id) {
    const result = await Menu.findByIdAndDelete(id);
    return !!result;
  }
}