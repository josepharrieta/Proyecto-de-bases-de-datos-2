import OrderItem from '../../../models/mongoModels/OrderItem.js';
import OrderItemDAO from '../daos/orderItemDAO.js';

export default class OrderItemDAOMongo extends OrderItemDAO {
  async createOrderItem(itemData) {
    return await OrderItem.create(itemData);
  }
  async getItemsByOrder(orderId) {
    return await OrderItem.find({ orderId });
  }
  async deleteOrderItem(id) {
    const result = await OrderItem.findByIdAndDelete(id);
    return !!result;
  }
}