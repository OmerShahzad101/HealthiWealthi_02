const multer = require("multer");
const express = require("express");

const controller = require("../controllers/user");
const { authenticate } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./upload");
  },
  filename(req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1];
    cb(null, `1${Date.now()}.${fileExtension}`);
  },
});
const upload = multer({ storage, dest: "./upload" });

const router = express.Router();

router
  .route("/uploadImage")
  .post(authenticate, upload.single("avatar"), controller.uploadImage);
router.route("/update").post(authenticate, controller.updateUser);

// Admin Index
router.route("/admin-all").post(authenticate, controller.index);

// Invite Company Employee & User
router
  .route("/company/invite")
  .post(authenticate, controller.inviteCompanyUser);


router
  .route('/company/user-edit/:id')
  .post(authenticate, controller.editUser);


router.route('/delete/:id').post(authenticate, controller.Deleting);


module.exports = router;
