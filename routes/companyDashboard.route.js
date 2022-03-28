const express = require('express');

const controller = require('../controllers/companyDashboard');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.route('/overview').post(authenticate, controller.companyOverView);
router.route('/leaderBoard').post(authenticate, controller.LeaderBoard);
router.route('/healthScore').post(authenticate, controller.HealthScore);
router.route('/departments').post(authenticate, controller.companyDepartments);
router.route('/departments-health').post(authenticate, controller.departmentsHealth);
router.route('/complete-onBoarding').get(authenticate, controller.completeOnBoarding);
router.route('/OnBoarding-done').get(authenticate, controller.completeOnBoardingDone);

module.exports = router;
