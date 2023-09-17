const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Order = require('../Model/order');
const config = require('../Config/config');

async function importDataFromCSV() {
  console.log('Starting data import...');
  
  fs.createReadStream('./data/mockData.csv')  // Check that the path is correct
    .pipe(csv())
    .on('data', async (row) => {
      console.log('Processing row:', row);
      const { customer_name, product_name, product_category, price, order_date } = row;

      const order = new Order({
        customerName: customer_name,
        productName: product_name,
        productCategory: product_category,
        price: parseFloat(price),
        orderDate: new Date(order_date),
      });

      try {
        const savedOrder = await order.save();
        console.log('Order saved:', savedOrder);
      } catch (err) {
        console.error('Error saving order:', err);
      }
    })
    .on('end', () => {
      console.log('Import complete');
    });
}


module.exports = importDataFromCSV;
