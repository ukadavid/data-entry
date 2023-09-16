const fs = require('fs');
const csv = require('csv-parser');
const Order = require('./model/order');

fs.createReadStream('./data/mockData.csv') 
  .pipe(csv())
  .on('data', (row) => {
    const { customer_name, product_name, product_category, price, order_date } = row;

    const order = new Order({
      customerName: customer_name,
      productName: product_name,
      productCategory: product_category,
      price: parseFloat(price),
      orderDate: new Date(order_date),
    });

    order.save((err, savedOrder) => {
      if (err) {
        console.error('Error saving order:', err);
      } else {
        console.log('Order saved:', savedOrder);
      }
    });
  })
  .on('end', () => {
    console.log('Import complete');
    mongoose.connection.close(); 
  });
