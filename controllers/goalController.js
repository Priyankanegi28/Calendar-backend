const Goal = require('../models/Goal');
const Task = require('../models/Task');

exports.getGoals = async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
};

exports.getTasksByGoal = async (req, res) => {
  const tasks = await Task.find({ goalId: req.params.goalId });
  res.json(tasks);
};
