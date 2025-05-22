import Role from '../../../models/mongoModels/Role.js';

export default class RoleDAOMongo extends RoleDAO {
  async createRole(roleData) {
    return await Role.create(roleData);
  }
  async getRoles() {
    return await Role.find();
  }
  async updateRole(id, updates) {
    return await Role.findByIdAndUpdate(id, updates, { new: true });
  }
  async deleteRole(id) {
    const result = await Role.findByIdAndDelete(id);
    return !!result;
  }
}