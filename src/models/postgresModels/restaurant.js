export default (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    }
  });

  Restaurant.associate = (models) => {
    Restaurant.belongsTo(models.User, { foreignKey: 'ownerId' });
    Restaurant.hasMany(models.Menu);
    Restaurant.hasMany(models.RestaurantAvailability);
    Restaurant.hasMany(models.Order);
    Restaurant.hasMany(models.Reservation);
  };

  return Restaurant;
};