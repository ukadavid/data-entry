const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Added CORS
const config = require('./config/config');

const app = express();
const PORT = config.PORT || 3000;
const MONGODB_URI = config.MONGODB_URI;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
