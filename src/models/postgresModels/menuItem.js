export default (sequelize, DataTypes) => {
  const MenuItem = sequelize.define('MenuItem', {
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });

  MenuItem.associate = (models) => {
    MenuItem.belongsTo(models.Menu);
    MenuItem.belongsTo(models.Product);
  };

  return MenuItem;
};