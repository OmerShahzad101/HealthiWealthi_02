const express = require('express');

const controller = require('../controllers/departments');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.route('/admin-all').post(authenticate, controller.index);
router.route('/company-all').get(authenticate, controller.getAllDepartments);
router.route('/employees-all').get(authenticate, controller.getAllEmployees);
router.route('/assign-or-update-hod').post(authenticate, controller.assignOrUpdateHeadOfDepartment);

module.exports = router;
