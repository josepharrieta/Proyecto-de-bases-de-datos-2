import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);