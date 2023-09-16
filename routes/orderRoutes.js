// routes/api.js
const express = require('express');
const router = express.Router();
const {
    createOrder,
    retrieveOrder,
    retrieveTotalRevenue,
    retrieveNumberOfOrder, 
    retrieveUniqueCustomerNames,
  } = require('../Controller/orderController');


// Create a new order
router.post('/orders', createOrder);

// Retrieve orders
router.get('/orders', retrieveOrder);

// Retrieve total revenue
router.get('/total-revenue', retrieveTotalRevenue);

// Retrieve number of orders
router.get('/total-orders', retrieveNumberOfOrder);

// Retrieve number of unique customer names
router.get('/total-customers', retrieveUniqueCustomerNames);

module.exports = router;
