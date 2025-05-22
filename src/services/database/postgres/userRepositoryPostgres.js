import User from '../../../models/postgresModels/User.js';
import UserRepository from '../repositories/userRepository.js';

export default class UserRepositoryPostgres extends UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async updateUser(id, updates) {
    const user = await User.findByPk(id);
    return user ? await user.update(updates) : null;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    return user ? await user.destroy() : false;
  }
}