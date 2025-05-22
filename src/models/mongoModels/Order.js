import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  status: { type: String, default: 'pending' },
  total: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }]
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);