const express = require('express');

const controller = require('../controllers/subscription');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.route('/plans/list').get(authenticate, controller.getPlans);
router.route('/plan/:planId').get(authenticate, controller.getPlanDetails);
router.route('/plan/create').post(authenticate, controller.createSubscriptionPlan);
router.route('/all').get(controller.index);
router.route('/update/plan/:planId').post(authenticate, controller.updateSubscriptionPlan);

router.route('/start-free-trial').post(authenticate, controller.startTrial);
router.route('/modify-subscription').post(authenticate, controller.modifySubscription);
router.route('/change-subscription-plan').post(authenticate, controller.changeSubscriptionPlan);
router.route('/cancel-subscription').post(authenticate, controller.cancelSubscription);

module.exports = router;
