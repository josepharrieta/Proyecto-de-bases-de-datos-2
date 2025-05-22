import Role from '../../../models/postgresModels/Role.js';
import RoleDAO from '../daos/roleDAO.js'

export default class RoleDAOPostgres extends RoleDAO {
  async createRole(roleData) {
    return await Role.create(roleData);
  }
  async getRoles() {
    return await Role.findAll();
  }
  async updateRole(id, updates) {
    const role = await Role.findByPk(id);
    return role ? await role.update(updates) : null;
  }
  async deleteRole(id) {
    const role = await Role.findByPk(id);
    return role ? await role.destroy() : false;
  }
}