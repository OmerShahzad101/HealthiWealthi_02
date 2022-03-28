const express = require('express');

const controller = require('../controllers/goals');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.route('/getUserGoals/:employeeId').get(authenticate, controller.getUserGoals);
router.route('/create').get(controller.create);

module.exports = router;
