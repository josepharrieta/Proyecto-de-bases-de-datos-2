import Reservation from '../../../models/postgresModels/Reservation.js';
import ReservationRepository from '../repositories/reservationRepository.js';

export default class ReservationRepositoryPostgres extends ReservationRepository {
  async createReservation(reservationData) {
    return await Reservation.create(reservationData);
  }
  async getReservationById(id) {
    return await Reservation.findByPk(id);
  }
  async getReservationsByUser(userId) {
    return await Reservation.findAll({ where: { userId } });
  }
  async updateReservationStatus(id, newStatus) {
    const reservation = await Reservation.findByPk(id);
    return reservation ? await reservation.update({ status: newStatus }) : null;
  }
  async deleteReservation(id) {
    const reservation = await Reservation.findByPk(id);
    return reservation ? await reservation.destroy() : false;
  }
}