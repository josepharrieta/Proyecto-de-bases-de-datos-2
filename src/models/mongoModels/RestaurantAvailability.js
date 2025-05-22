import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  dayOfWeek: { type: Number, required: true, min: 0, max: 6 }, // 0=Sunday
  openTime: { type: String, required: true }, // "HH:MM"
  closeTime: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

export default mongoose.model('RestaurantAvailability', availabilitySchema);