export default (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    reservationTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    guests: {
      type: DataTypes.INTEGER,
      validate: { min: 1 }
    }
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User);
    Reservation.belongsTo(models.Restaurant);
  };

  return Reservation;
};