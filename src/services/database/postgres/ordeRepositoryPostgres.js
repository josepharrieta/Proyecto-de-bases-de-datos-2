import Order from '../../../models/postgresModels/Order.js';
import OrderItem from '../../../models/postgresModels/OrderItem.js';

export default class OrderRepositoryPostgres {
  async createOrder(orderData) {
    const transaction = await sequelize.transaction();
    try {
      const order = await Order.create(orderData, { transaction });
      
      if (orderData.items) {
        await OrderItem.bulkCreate(
          orderData.items.map(item => ({
            ...item,
            orderId: order.id
          })),
          { transaction }
        );
      }
      
      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getOrderById(id) {
    return await Order.findByPk(id, {
      include: [{ model: OrderItem, as: 'items' }]
    });
  }

  async updateOrderStatus(id, newStatus) {
    const order = await Order.findByPk(id);
    return order ? await order.update({ status: newStatus }) : null;
  }

  async deleteOrder(id) {
    const transaction = await sequelize.transaction();
    try {
      await OrderItem.destroy({ 
        where: { orderId: id },
        transaction
      });
      
      const result = await Order.destroy({
        where: { id },
        transaction
      });
      
      await transaction.commit();
      return result > 0;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}