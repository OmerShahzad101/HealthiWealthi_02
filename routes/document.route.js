const express = require('express');

const controller = require('../controllers/document');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.route('/get').post( controller.get);

router.route('/add').post( controller.new);

router.route('/allUser').post( controller.index);


router.route('/delete/:id').post(authenticate, controller.Deleting);

//Generate PDF

router.route('/file').post( controller.makeDoc);



//Declined
router.route('/declined/:id').post(controller.Rejection);


module.exports = router;
