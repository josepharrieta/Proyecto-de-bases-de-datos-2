import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

export default mongoose.model('MenuItem', menuItemSchema);