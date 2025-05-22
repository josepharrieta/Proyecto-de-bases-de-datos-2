import Restaurant from '../../../models/mongoModels/Restaurant.js';
import RestaurantRepository from '../repositories/reservationRepository.js';

export default class RestaurantRepositoryMongo extends RestaurantRepository {
  async createRestaurant(restaurantData) {
    return await Restaurant.create(restaurantData);
  }
  async getRestaurantById(id) {
    return await Restaurant.findById(id);
  }
  async updateRestaurant(id, updates) {
    return await Restaurant.findByIdAndUpdate(id, updates, { new: true });
  }
  async deleteRestaurant(id) {
    const result = await Restaurant.findByIdAndDelete(id);
    return !!result;
  }
}