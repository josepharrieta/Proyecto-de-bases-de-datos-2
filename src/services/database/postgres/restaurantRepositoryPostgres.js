import Restaurant from '../../../models/postgresModels/Restaurant.js';
import RestaurantRepository from '../repositories/restaurantRepository.js';

export default class RestaurantRepositoryPostgres extends RestaurantRepository {
  async create(restaurantData) {
    return await Restaurant.create(restaurantData);
  }
  async getById(id) {
    return await Restaurant.findByPk(id);
  }
  async update(id, updates) {
    const restaurant = await Restaurant.findByPk(id);
    return restaurant ? await restaurant.update(updates) : null;
  }
  async delete(id) {
    const restaurant = await Restaurant.findByPk(id);
    return restaurant ? await restaurant.destroy() : false;
  }
}