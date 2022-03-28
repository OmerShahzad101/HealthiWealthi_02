const express = require('express');

const controller = require('../controllers/appIntegrated');
const controllerApp = require('../appIntegration/index');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.route('/admin-all').post(authenticate, controller.index);
router.route('/dignoApp').get(authenticate, controller.dignoApps);
router.route('/company').get(authenticate, controller.companyApps);
router.route('/createAppIntegration').post(authenticate, controller.createAppIntegration);
router.route('/unlinkApplication/:id').get(authenticate, controller.unlinkApplication);

router.route('/refreshAllApp').get(authenticate, controllerApp.RefreshUser);
router.route('/userLastRefreshData').get(authenticate, controllerApp.getUserLastRefreshData);

module.exports = router;
