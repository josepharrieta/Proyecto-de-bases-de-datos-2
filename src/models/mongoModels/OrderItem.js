import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

export default mongoose.model('OrderItem', orderItemSchema);