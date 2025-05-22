import RestaurantAvailability from '../../../models/mongoModels/RestaurantAvailability.js';
import RestaurantAvailabilityDAO from '../daos/restaurantAvailabilityDAO.js';

export default class RestaurantAvailabilityDAOMongo extends RestaurantAvailabilityDAO {
  async createAvailability(availabilityData) {
    return await RestaurantAvailability.create(availabilityData);
  }
  async getAvailabilitiesByRestaurant(restaurantId) {
    return await RestaurantAvailability.find({ restaurantId });
  }
  async updateAvailability(id, updates) {
    return await RestaurantAvailability.findByIdAndUpdate(id, updates, { new: true });
  }
  async deleteAvailability(id) {
    const result = await RestaurantAvailability.findByIdAndDelete(id);
    return !!result;
  }
}