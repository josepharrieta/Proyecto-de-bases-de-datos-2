import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model('ProductCategory', productCategorySchema);