import OrderItem from '../../../models/postgresModels/OrderItem.js';
import OrderItemDAO from '../daos/orderItemDAO.js';

export default class OrderItemDAOPostgres extends OrderItemDAO {
  async createOrderItem(itemData) {
    return await OrderItem.create(itemData);
  }
  async getItemsByOrder(orderId) {
    return await OrderItem.findAll({ where: { orderId } });
  }
  async deleteOrderItem(id) {
    const item = await OrderItem.findByPk(id);
    return item ? await item.destroy() : false;
  }
}