export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.belongsTo(models.Restaurant);
    Order.hasMany(models.OrderItem);
  };

  return Order;
};