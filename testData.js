const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

const testEvents = [
  {
    title: 'Team Meeting',
    start: new Date(2024, 3, 18, 10, 0), // April 18, 2024, 10:00 AM
    end: new Date(2024, 3, 18, 11, 0),   // April 18, 2024, 11:00 AM
    category: 'work',
    color: '#3f51b5'
  },
  {
    title: 'Lunch Break',
    start: new Date(2024, 3, 18, 12, 0), // April 18, 2024, 12:00 PM
    end: new Date(2024, 3, 18, 13, 0),   // April 18, 2024, 1:00 PM
    category: 'eating',
    color: '#ff9800'
  },
  {
    title: 'Gym Session',
    start: new Date(2024, 3, 18, 17, 0), // April 18, 2024, 5:00 PM
    end: new Date(2024, 3, 18, 18, 30),  // April 18, 2024, 6:30 PM
    category: 'exercise',
    color: '#8bc34a'
  }
];

const populateTestData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert test events
    const insertedEvents = await Event.insertMany(testEvents);
    console.log('Inserted test events:', insertedEvents);

    console.log('Test data population complete');
    process.exit(0);
  } catch (error) {
    console.error('Error populating test data:', error);
    process.exit(1);
  }
};

populateTestData(); 