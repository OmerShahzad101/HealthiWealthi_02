const express = require('express');

const controller = require('../controllers/countryStateCity');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.route('/countries').get(authenticate, controller.getAllCountries);
router.route('/countries/:ciso').get(authenticate, controller.getCountryByCode);

router.route('/states').get(authenticate, controller.getAllStates);
router.route('/countries/:ciso/states').get(authenticate, controller.getStatesOfCountry);
router.route('/countries/:ciso/states/:siso').get(authenticate, controller.getStateByCodeAndCountry);

router.route('/countries/:ciso/cities').get(authenticate, controller.getCitiesOfCountry);
router.route('/countries/:ciso/states/:siso/cities').get(authenticate, controller.getCitiesByStateAndCountry);

module.exports = router;
