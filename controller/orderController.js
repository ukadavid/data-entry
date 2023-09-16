const Order = require('../Model/order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerName, productName, productCategory, price, orderDate } = req.body;
    const order = new Order({
      customerName,
      productName,
      productCategory,
      price,
      orderDate,
    });
    
    const savedOrder = await order.save();
    return res.status(201).json(savedOrder);
  } catch (err) {
    return res.status(500).send(err);
  }
};


// Retrieve orders
const retrieveOrder = async (req, res) => {
  try {
    const orders = await Order.find().exec();
    return res.json(orders);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// Retrieve total revenue
const retrieveTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$price' },
        },
      },
    ]).exec();

    console.log(result);
    return res.json(result[0].totalRevenue);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// Retrieve number of orders
const retrieveNumberOfOrder = async (req, res) => {
  try {
    const count = await Order.countDocuments().exec();
    return res.json(count);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// Retrieve number of unique customer names
const retrieveUniqueCustomerNames = async (req, res) => {
  try {
    const names = await Order.distinct('customerName').exec();
    return res.json(names.length);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createOrder,
  retrieveOrder,
  retrieveTotalRevenue,
  retrieveNumberOfOrder,
  retrieveUniqueCustomerNames,
};
