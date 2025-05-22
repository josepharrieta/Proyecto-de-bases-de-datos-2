import RestaurantAvailability from '../../../models/postgresModels/RestaurantAvailability.js';
import RestaurantAvailabilityDAO from '../daos/restaurantAvailabilityDAO.js';

export default class RestaurantAvailabilityDAOPostgres extends RestaurantAvailabilityDAO {
  async createAvailability(availabilityData) {
    return await RestaurantAvailability.create(availabilityData);
  }
  async getAvailabilitiesByRestaurant(restaurantId) {
    return await RestaurantAvailability.findAll({ where: { restaurantId } });
  }
  async updateAvailability(id, updates) {
    const availability = await RestaurantAvailability.findByPk(id);
    return availability ? await availability.update(updates) : null;
  }
  async deleteAvailability(id) {
    const availability = await RestaurantAvailability.findByPk(id);
    return availability ? await availability.destroy() : false;
  }
}