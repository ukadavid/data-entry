const Order = require('../Model/order');

// Create a new order
const createOrder = ((req, res) => {
  const { customerName, productName, productCategory, price, orderDate } = req.body;
  const order = new Order({
    customerName,
    productName,
    productCategory,
    price,
    orderDate,
  });

  order.save((err, savedOrder) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).json(savedOrder);
  });
});

// Retrieve orders
const retrieveOrder = ((req, res) => {
  Order.find((err, orders) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(orders);
  });
});

// Retrieve total revenue
const retrieveTotalRevenue = ((req, res) => {
  Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$price' },
      },
    },
  ]).exec((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(result[0].totalRevenue);
  });
});

// Retrieve number of orders
const retrieveNumberOfOrder = ((req, res) => {
  Order.countDocuments((err, count) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(count);
  });
});

// Retrieve number of unique customer names
const retrieveUniqueCustomerNames = ((req, res) => {
  Order.distinct('customerName', (err, names) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(names.length);
  });
});

module.exports = {
  createOrder,
  retrieveOrder,
  retrieveTotalRevenue,
  retrieveNumberOfOrder, 
  retrieveUniqueCustomerNames,
}