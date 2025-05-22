import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
  availabilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantAvailability' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
}, { timestamps: true });

export default mongoose.model('Restaurant', restaurantSchema);