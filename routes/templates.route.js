const multer = require('multer');
const express = require('express');

const controller = require('../controllers/templates');
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

router.route('/files').post(authenticate, upload.array("fileToUpload[]") , controller.new);
router.route('/create').post(authenticate, controller.CreateTemplate);

router.route('/get').post(controller.getTemplates);

router.route('/list-index').post(authenticate, controller.index);


router.route('/delete/:id').post(authenticate, controller.Deleting);



module.exports = router;
