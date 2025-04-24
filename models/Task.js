const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  goalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal'
  },
  name: String
});

module.exports = mongoose.model('Task', taskSchema);
