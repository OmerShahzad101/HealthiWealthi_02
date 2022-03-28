const express = require('express');

const controller = require('../controllers/dashboard');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.route('/overview').post(authenticate, controller.adminOverview);
router.route('/admin-leaderBoard').post(authenticate, controller.adminLeaderBoard);
router.route('/admin-adminChartData').post(authenticate, controller.adminChartData);
router.route('/get-subscription-stats').post(authenticate, controller.getSubscriptionStats);

module.exports = router;
