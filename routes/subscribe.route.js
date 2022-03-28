const express = require('express');

const controller = require('../controllers/subscribe');

const router = express.Router();

router.route('/create').post(controller.subscription);

module.exports = router;
