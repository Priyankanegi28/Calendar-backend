const express = require('express');
const router = express.Router();
const {
  getGoals,
  getTasksByGoal
} = require('../controllers/goalController');

router.get('/goals', getGoals);
router.get('/tasks/:goalId', getTasksByGoal);

module.exports = router;
