import Order from '../../../models/mongoModels/Order.js';
import OrderItem from '../../../models/mongoModels/OrderItem.js';

export default class OrderRepositoryMongo {
  async createOrder(orderData) {
    const order = await Order.create(orderData);
    if (orderData.items) {
      await OrderItem.insertMany(
        orderData.items.map(item => ({
          ...item,
          orderId: order._id
        }))
      );
    }
    return order;
  }

  async getOrderById(id) {
    return await Order.findById(id).populate('items');
  }

  async updateOrderStatus(id, newStatus) {
    return await Order.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );
  }

  async deleteOrder(id) {
    await OrderItem.deleteMany({ orderId: id });
    const result = await Order.findByIdAndDelete(id);
    return !!result;
  }
}