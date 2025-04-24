const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

// Add debugging information
console.log('MongoDB URI:', config.MONGO_URI);
console.log('Port:', config.PORT);

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const eventRoutes = require('./routes/eventRoutes');
const goalRoutes = require('./routes/goalRoutes');

app.use('/api/events', eventRoutes);
app.use('/api', goalRoutes);

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(config.PORT || 5000, () => {
      console.log(`Server running on port ${config.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
