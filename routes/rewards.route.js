const express = require('express');

const controller = require('../controllers/rewards');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.route('/allRewardsType').get(authenticate, controller.getAllRewardsType);

router.route('/listing').post(authenticate, controller.RewardsListing);

router.route('/deleting/:id').get(authenticate, controller.RewardDeleting);

router.route('/create').post(authenticate, controller.createReward);

router.route('/rewardsType/departmentUpdate').post(authenticate, controller.RewardsTypeDepartmentUpdate);

module.exports = router;
