const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['exercise', 'eating', 'work', 'family', 'social', 'relax']
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  color: {
    type: String,
    default: '#3f51b5'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      // Ensure dates are in ISO format
      ret.start = ret.start.toISOString();
      ret.end = ret.end.toISOString();
      return ret;
    }
  }
});

// Ensure end date is after start date
eventSchema.pre('save', function(next) {
  if (this.end < this.start) {
    next(new Error('End date must be after start date'));
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
