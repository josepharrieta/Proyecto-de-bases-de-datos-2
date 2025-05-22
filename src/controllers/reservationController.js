  import { loadRepositories } from '../services/database/index.js';

  const { reservationRepository } = loadRepositories();

  export const createReservation = async (req, res) => {
    try {
      const { restaurantId, reservationTime, guests } = req.body;

      const isAvailable = await reservationRepository.validateAvailability({
        restaurantId,
        reservationTime: new Date(reservationTime),
        guests
      });

      if (!isAvailable) {
        return res.status(400).json({ message: "Horario no disponible" });
      }

      const reservation = await reservationRepository.create({
        userId: req.user.id,
        restaurantId,
        reservationTime,
        guests
      });
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getReservationById = async (req, res) => {
    try {
      const reservation = await reservationRepository.getById(req.params.id);
      if (!reservation) return res.status(404).json({ message: "Reservation not found" });
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getReservationsByUser = async (req, res) => {
    try {
      const reservations = await reservationRepository.getByUser(req.user.id);
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await reservationRepository.updateStatus(req.params.id, status);
    if (!reservation) return res.status(404).json({ message: "Reserva no encontrada" });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  };

  export const deleteReservation = async (req, res) => {
    try {
      const success = await reservationRepository.delete(req.params.id);
      if (!success) return res.status(404).json({ message: "Reservation not found" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };