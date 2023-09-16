const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const config = require('./Config/config');
const apiRoutes = require('./Routes/orderRoutes');
const importDataFromCSV = require('./Utils/orderData');

const app = express();
const PORT = config.PORT || 3000;
const MONGODB_URI = config.MONGODB_URI;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  await importDataFromCSV();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
