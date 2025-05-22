
// reservationController.test.js
// Primero creamos el mock antes de cualquier importación
jest.mock('../../src/services/database/index.js', () => {
  const mockReservationRepository = {
    validateAvailability: jest.fn(),
    create: jest.fn(),
    getById: jest.fn(),
    getByUser: jest.fn(),
    updateStatus: jest.fn(),
    delete: jest.fn()
  };
  
  return {
    loadRepositories: jest.fn(() => ({ reservationRepository: mockReservationRepository }))
  };
});

// Después importamos los controladores
import {
  createReservation,
  getReservationById,
  getReservationsByUser,
  updateReservationStatus,
  deleteReservation
} from '../../src/controllers/reservationController.js';

// Y la función mockeada para poder manipularla en los tests
import { loadRepositories } from '../../src/services/database/index.js';

describe('Reservation Controller', () => {
  let mockRequest;
  let mockResponse;
  let reservationRepository;
  
  beforeEach(() => {
    // Obtener la referencia al repositorio mockeado
    reservationRepository = loadRepositories().reservationRepository;
    
    // Resetear todos los mocks
    jest.clearAllMocks();
    
    // Configurar mocks para req y res
    mockRequest = {
      body: {},
      params: {},
      user: { id: 'user123' }
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });
  
  describe('createReservation', () => {
    test('debería crear una reserva cuando el horario está disponible', async () => {
      // Arrange
      const reservationData = {
        restaurantId: 'rest123',
        reservationTime: '2025-06-01T19:00:00.000Z',
        guests: 4
      };
      mockRequest.body = reservationData;
      
      const createdReservation = {
        id: 'resv123',
        userId: 'user123',
        ...reservationData,
        status: 'PENDIENTE'
      };
      
      reservationRepository.validateAvailability.mockResolvedValue(true);
      reservationRepository.create.mockResolvedValue(createdReservation);
      
      // Act
      await createReservation(mockRequest, mockResponse);
      
      // Assert
      expect(reservationRepository.validateAvailability).toHaveBeenCalledWith({
        restaurantId: reservationData.restaurantId,
        reservationTime: expect.any(Date),
        guests: reservationData.guests
      });
      expect(reservationRepository.create).toHaveBeenCalledWith({
        userId: mockRequest.user.id,
        restaurantId: reservationData.restaurantId,
        reservationTime: reservationData.reservationTime,
        guests: reservationData.guests
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdReservation);
    });
    
    test('debería devolver código 400 cuando el horario no está disponible', async () => {
      // Arrange
      const reservationData = {
        restaurantId: 'rest123',
        reservationTime: '2025-06-01T19:00:00.000Z',
        guests: 4
      };
      mockRequest.body = reservationData;
      
      reservationRepository.validateAvailability.mockResolvedValue(false);
      
      // Act
      await createReservation(mockRequest, mockResponse);
      
      // Assert
      expect(reservationRepository.validateAvailability).toHaveBeenCalled();
      expect(reservationRepository.create).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Horario no disponible" });
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      mockRequest.body = {
        restaurantId: 'rest123',
        reservationTime: '2025-06-01T19:00:00.000Z',
        guests: 4
      };
      
      reservationRepository.validateAvailability.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await createReservation(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
  
  describe('getReservationById', () => {
    test('debería devolver una reserva cuando existe', async () => {
      // Arrange
      const reservationId = 'resv123';
      mockRequest.params.id = reservationId;
      const reservation = {
        id: reservationId,
        userId: 'user123',
        restaurantId: 'rest123',
        reservationTime: '2025-06-01T19:00:00.000Z',
        guests: 4,
        status: 'CONFIRMADA'
      };
      
      reservationRepository.getById.mockResolvedValue(reservation);
      
      // Act
      await getReservationById(mockRequest, mockResponse);
      
      // Assert
      expect(reservationRepository.getById).toHaveBeenCalledWith(reservationId);
      expect(mockResponse.json).toHaveBeenCalledWith(reservation);
    });
    
    test('debería devolver código 404 cuando la reserva no existe', async () => {
      // Arrange
      mockRequest.params.id = 'nonexistent';
      reservationRepository.getById.mockResolvedValue(null);
      
      // Act
      await getReservationById(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Reservation not found" });
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      mockRequest.params.id = 'resv123';
      reservationRepository.getById.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await getReservationById(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
  
  describe('getReservationsByUser', () => {
    test('debería devolver todas las reservas del usuario', async () => {
      // Arrange
      const userId = 'user123';
      mockRequest.user.id = userId;
      
      const userReservations = [
        {
          id: 'resv123',
          userId,
          restaurantId: 'rest123',
          reservationTime: '2025-06-01T19:00:00.000Z',
          guests: 4,
          status: 'CONFIRMADA'
        },
        {
          id: 'resv124',
          userId,
          restaurantId: 'rest456',
          reservationTime: '2025-06-05T20:00:00.000Z',
          guests: 2,
          status: 'PENDIENTE'
        }
      ];
      
      reservationRepository.getByUser.mockResolvedValue(userReservations);
      
      // Act
      await getReservationsByUser(mockRequest, mockResponse);
      
      // Assert
      expect(reservationRepository.getByUser).toHaveBeenCalledWith(userId);
      expect(mockResponse.json).toHaveBeenCalledWith(userReservations);
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      reservationRepository.getByUser.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await getReservationsByUser(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
  
  describe('updateReservationStatus', () => {
    test('debería actualizar el estado de una reserva cuando existe', async () => {
      // Arrange
      const reservationId = 'resv123';
      mockRequest.params.id = reservationId;
      mockRequest.body = { status: 'CONFIRMADA' };
      
      const updatedReservation = {
        id: reservationId,
        userId: 'user123',
        restaurantId: 'rest123',
        reservationTime: '2025-06-01T19:00:00.000Z',
        guests: 4,
        status: 'CONFIRMADA'
      };
      
      reservationRepository.updateStatus.mockResolvedValue(updatedReservation);
      
      // Act
      await updateReservationStatus(mockRequest, mockResponse);
      
      // Assert
      expect(reservationRepository.updateStatus).toHaveBeenCalledWith(reservationId, 'CONFIRMADA');
      expect(mockResponse.json).toHaveBeenCalledWith(updatedReservation);
    });
    
    test('debería devolver código 404 cuando la reserva no existe', async () => {
      // Arrange
      mockRequest.params.id = 'nonexistent';
      mockRequest.body = { status: 'CONFIRMADA' };
      
      reservationRepository.updateStatus.mockResolvedValue(null);
      
      // Act
      await updateReservationStatus(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Reserva no encontrada" });
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      mockRequest.params.id = 'resv123';
      mockRequest.body = { status: 'CONFIRMADA' };
      
      reservationRepository.updateStatus.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await updateReservationStatus(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
  
  describe('deleteReservation', () => {
    test('debería eliminar una reserva cuando existe y devolver código 204', async () => {
      // Arrange
      const reservationId = 'resv123';
      mockRequest.params.id = reservationId;
      
      reservationRepository.delete.mockResolvedValue(true);
      
      // Act
      await deleteReservation(mockRequest, mockResponse);
      
      // Assert
      expect(reservationRepository.delete).toHaveBeenCalledWith(reservationId);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
    
    test('debería devolver código 404 cuando la reserva no existe', async () => {
      // Arrange
      mockRequest.params.id = 'nonexistent';
      
      reservationRepository.delete.mockResolvedValue(false);
      
      // Act
      await deleteReservation(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Reservation not found" });
    });
    
    test('debería manejar errores y devolver código 500', async () => {
      // Arrange
      mockRequest.params.id = 'resv123';
      
      reservationRepository.delete.mockRejectedValue(new Error('Error de base de datos'));
      
      // Act
      await deleteReservation(mockRequest, mockResponse);
      
      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error de base de datos' });
    });
  });
});