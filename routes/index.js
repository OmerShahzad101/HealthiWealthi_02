const express = require('express');

/**
 * IMPORT ROUTES
 */
const AuthRoutes = require('./auth.route');
const User = require('./user.route');
const COMPANY = require('./company.route');
const TEMPLATE = require('./templates.route');
const DOCUMENT = require('./document.route');
const DASHBOARD = require('./dashboard.route');



/**
 * INITIALIZE ROUTER
 */
const router = express.Router();

/**
 * ATTACH ROUTES
 */
router.use('/auth', AuthRoutes);
router.use('/user', User);
router.use('/template', TEMPLATE);
router.use('/document', DOCUMENT);
router.use('/company', COMPANY);
router.use('/dashboard', DASHBOARD);


module.exports = router;
