import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  reservationTime: { type: Date, required: true },
  guests: { type: Number, min: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
}, { timestamps: true });

export default mongoose.model('Reservation', reservationSchema);