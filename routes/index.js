const express = require("express");

/**
 * IMPORT ROUTES
 */
const AuthRoutes = require("./auth.route");
const User = require("./user.route");

/**
 * INITIALIZE ROUTER
 */
const router = express.Router();

/**
 * ATTACH ROUTES
 */
router.use("/auth", AuthRoutes);
router.use("/user", User);

module.exports = router;
