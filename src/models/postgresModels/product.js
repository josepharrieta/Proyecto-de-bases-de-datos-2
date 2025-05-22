export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.ProductCategory, { foreignKey: 'categoryId' });
    Product.hasMany(models.MenuItem);
    Product.hasMany(models.OrderItem);
  };

  return Product;
};