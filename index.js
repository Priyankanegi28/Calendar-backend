const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();

// Enhanced CORS for production
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://calendar-add-events.netlify.app/' // REPLACE WITH YOUR NETLIFY URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
const eventRoutes = require('./routes/eventRoutes');
const goalRoutes = require('./routes/goalRoutes');
app.use('/api/events', eventRoutes);
app.use('/api', goalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Database connection
mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = config.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });