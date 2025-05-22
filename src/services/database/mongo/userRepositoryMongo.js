import User from '../../../models/mongoModels/User.js';
import UserRepository from '../repositories/userRepository.js';

export default class UserRepositoryMongo extends UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateUser(id, updates) {
    return await User.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteUser(id) {
    const result = await User.findByIdAndDelete(id);
    return !!result;
  }
}