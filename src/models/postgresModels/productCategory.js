export default (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    }
  });

  ProductCategory.associate = (models) => {
    ProductCategory.hasMany(models.Product);
  };

  return ProductCategory;
};