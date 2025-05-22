import Menu from '../../../models/postgresModels/Menu.js';
import MenuDAO from 'from ../daos/MenuDAO.js'

export default class MenuDAOPostgres extends MenuDAO {
  async createMenu(menuData) {
    return await Menu.create(menuData);
  }

  async getMenuById(id) {
    return await Menu.findByPk(id);
  }

  async updateMenu(id, updates) {
    const menu = await Menu.findByPk(id);
    return menu ? await menu.update(updates) : null;
  }

  async deleteMenu(id) {
    const menu = await Menu.findByPk(id);
    return menu ? await menu.destroy() : false;
  }
}