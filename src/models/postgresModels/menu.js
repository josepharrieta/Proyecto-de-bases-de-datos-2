export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Menu.associate = (models) => {
    Menu.belongsTo(models.Restaurant);
    Menu.hasMany(models.MenuItem);
  };

  return Menu;
};