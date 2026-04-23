const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    index: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  discountPrice: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
  },
  weight: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: [
      'fruits-and-vegetables',
      'dairy-and-bakery',
      'staples',
      'snacks-and-branded-foods',
      'beverages',
      'home-and-kitchen'
    ],
    index: true,
  },
  images: {
    type: [String],
    required: [true, 'Please provide product image URLs'],
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
