import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }]
}, { shardKey: { _id: 'hashed' } }); // Sharding configurado

export default mongoose.model('Product', productSchema);