import Reservation from '../../../models/mongoModels/Reservation.js';
import ReservationRepository from '../repositories/reservationRepository.js';

export default class ReservationRepositoryMongo extends ReservationRepository {
  async createReservation(reservationData) {
    return await Reservation.create(reservationData);
  }
  async getReservationById(id) {
    return await Reservation.findById(id);
  }
  async getReservationsByUser(userId) {
    return await Reservation.find({ userId });
  }
  async updateReservationStatus(id, newStatus) {
    return await Reservation.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );
  }
  async deleteReservation(id) {
    const result = await Reservation.findByIdAndDelete(id);
    return !!result;
  }
}