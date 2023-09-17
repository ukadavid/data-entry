const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  productName: String,
  productCategory: String,
  price: Number,
  orderDate: Date,
});

module.exports = mongoose.model('Order', orderSchema);
