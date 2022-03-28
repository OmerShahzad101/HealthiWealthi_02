const multer = require('multer');
const express = require('express');

const controller = require('../controllers/company');
const { authenticate } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './upload');
    },
    filename(req, file, cb) {
        const fileExtension = file.mimetype.split('/')[1];
        cb(null, `1${Date.now()}.${fileExtension}`);
    },
});
const upload = multer({ storage, dest: './upload' });

const router = express.Router();

router.route('/create').post(authenticate, controller.create);
router.route('/update').post(authenticate, controller.updateCompany);
router.route('/uploadImage').post(authenticate, upload.single('avatar'), controller.uploadImage);
// router.route('/changeStatus/:companyId').post(authenticate, controller.updateStatus);
router.route('/single/:companyId').get(authenticate, controller.getCompany);


module.exports = router;
