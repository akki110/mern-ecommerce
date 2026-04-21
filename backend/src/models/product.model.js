const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['electronics', 'clothing', 'accessories', 'home', 'beauty'],
    index: true,
  },
  image: {
    type: String,
    required: [true, 'Please provide product image URL'],
  },
  countInStock: {
    type: Number,
    required: [true, 'Please provide stock count'],
    default: 0,
  },
  isSale: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
