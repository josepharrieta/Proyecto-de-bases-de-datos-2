export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
    User.hasMany(models.Restaurant, { foreignKey: 'ownerId' });
    User.hasMany(models.Order);
    User.hasMany(models.Reservation);
  };

  return User;
};