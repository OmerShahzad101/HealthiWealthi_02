const express = require('express');
const passport = require('passport');

const controller = require('../controllers/auth');
const { authenticate } = require('../middleware/auth');
const app = require('../config/express');
const { baseURL } = require('../config/vars');

app.use(passport.initialize());
app.use(passport.session());
require('../_utils/socialLoginHelper')(passport);

const router = express.Router();

router.route('/login').post(controller.login);
router.route('/signup').post(controller.signup);
router.route('/forgot-password').post(controller.forgotPassword);
router.route('/changePassword/:token').post(controller.setPassword);
router.route('/change-password').post(authenticate, controller.changePassword);
router.route('/verify-email/:token').get(controller.verifyEmail);

router.route('/googleLogin/:access_path').get(controller.googleLogin);
router.route('/google').get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }));

router.route('/google/callback').get(
    passport.authenticate('google', {
        failureRedirect: '/auth/social/failure',
    }),
    (req, res) => {
        res.redirect(`${baseURL}login-private/?access_path=${req.user.googleAccessToken}`);
    }
);

module.exports = router;
