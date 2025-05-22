export default (sequelize, DataTypes) => {
  const RestaurantAvailability = sequelize.define('RestaurantAvailability', {
    dayOfWeek: {
      type: DataTypes.INTEGER, // 0 (Domingo) - 6 (Sábado)
      allowNull: false
    },
    openTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    closeTime: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });

  RestaurantAvailability.associate = (models) => {
    RestaurantAvailability.belongsTo(models.Restaurant);
  };

  return RestaurantAvailability;
};