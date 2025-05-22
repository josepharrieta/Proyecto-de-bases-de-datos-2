export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: {}
    }
  });

  Role.associate = (models) => {
    Role.hasMany(models.User);
  };

  return Role;
};