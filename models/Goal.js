const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: String,
  color: String
});

module.exports = mongoose.model('Goal', goalSchema);
