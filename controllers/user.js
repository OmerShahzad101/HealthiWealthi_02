const secureRandomPassword = require("secure-random-password");
const bcrypt = require("bcrypt");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Department = require("../models/department");
const Subscription = require("../models/subscription");
const User = require("../models/user");
const Company = require("../models/company");
const roles = require("../_helper/roles");

const { validateEmail } = require("../_helper/validation");
const { SendEmail } = require("../_utils/email_Send");
const { sendFileS3Bucket } = require("../_utils/awsS3Bucket");
const { baseURL } = require("../config/vars");
const {
  inviteUserViaEmailTemplate,
} = require("../emailTemplate/emailTemplate");

const { generateUniqueId } = require("../_helper/uniqueIdGeneration");

const saltRounds = 10;

exports.uploadImage = async (req, res) => {
  try {
    let avatar = "";
    let fileName = "";
    if (req.file) {
      fileName = req.file.filename;
    }

    avatar = `https://netrust-solution-bucket.s3.ap-southeast-1.amazonaws.com/${fileName}`;

    if (avatar) {
      try {
        const doc = await User.updateOne(
          { _id: req.user },
          { avatar },
          { upsert: true }
        ).exec();
        if (!doc) {
          return res.status(400).send({
            success: false,
            message: "User Not Found!",
          });
        }

        const user = await User.findOne({ _id: req.user }).exec();
        const data = {
          userName: user.userName,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        };

        if (fileName) sendFileS3Bucket(fileName);
        return res.status(200).send({
          success: true,
          user: data,
          message: "User Profile Image Updated Successfully!",
        });
      } catch (err) {
        return res.status(404).send({
          success: false,
          message: err.message,
        });
      }
    } else {
      return res
        .status(400)
        .send({ success: false, message: "No image was provided to upload!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userName } = req.body;

    if (!userName) {
      return res
        .status(400)
        .send({ success: false, message: "User Name Required Field!" });
    }

    const updateDocument = { userName };

    try {
      const doc = await User.updateOne({ _id: req.user }, updateDocument, {
        upsert: true,
      }).exec();
      if (!doc) {
        return res.status(404).send({
          success: false,
          message: "User Not Found!",
        });
      }

      const user = await User.findOne({ _id: req.user }).exec();
      const data = {
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      };

      return res.status(200).send({
        success: true,
        user: data,
        message: "User Profile Updated Successfully!",
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: err.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Index List
exports.index = async (req, res) => {
  try {
    const queryObject = {};
    const payload = req.body;
    const { role } = req;

    if (role === "301") {
      queryObject.parentId = mongoose.Types.ObjectId(req.user);
    } else if (role === "302") {
      queryObject.parentId = mongoose.Types.ObjectId(req.parentId);
    }

    const { text } = payload;
    let { pageNumber, rowsPerPage } = payload;

    if (!pageNumber || Number.isNaN(pageNumber) || pageNumber <= 0) {
      pageNumber = 0;
    } else {
      pageNumber = Number(pageNumber) - 1;
    }

    if (
      !rowsPerPage ||
      Number.isNaN(rowsPerPage) ||
      rowsPerPage < 10 ||
      rowsPerPage > 50
    ) {
      rowsPerPage = 10;
    }

    if (text) {
      queryObject.$or = [
        { userName: new RegExp(text, "i") },
        { email: new RegExp(text, "i") },
      ];
    }

    const pipeline = [
      {
        $match: queryObject,
      },
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $project: {
          _id: 1,
          userName: 1,
          email: 1,
          avatar: 1,
          role: 1,
          createdAt: 1,
          allowWorkFlow: 1,
          allowTemplate: 1,
          allowDocument: 1,
          allowUser: 1,
          allowCompany: 1,
        },
      },
      {
        $limit: pageNumber * rowsPerPage + rowsPerPage,
      },
      {
        $skip: pageNumber * rowsPerPage,
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ];

    try {
      const documents = await User.aggregate(pipeline).exec();
      const count = await User.countDocuments(queryObject).exec();
      return res.status(200).json({
        success: true,
        message: "Users Retrieved Successfully!",
        data: documents,
        count,
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: err,
      });
    }
  } catch (e) {
    return res.status(500).json({ success: false, message: e });
  }
};

// Company Invite Email
exports.inviteCompanyUser = async (req, res) => {
  try {
    const {
      email,
      userName,
      type,
      allowWorkFlow,
      allowTemplate,
      allowDocument,
      allowUser,
      allowCompany,
    } = req.body;
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email is required!" });
    }
    if (!validateEmail(email)) {
      return res
        .status(400)
        .send({ success: false, message: "Please enter valid email address!" });
    }

    // Check if user with given email,  already exists
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      const errorObj = {
        email: "Email already exists!",
      };

      return res
        .status(200)
        .send({ success: false, message: "Already exists", errorObj });
    }
    let assignRole = "";
    if (type) {
      Object.keys(roles).some((role) => {
        const condition = type === roles[role].value.toLowerCase();
        if (condition) {
          assignRole = roles[role].key;
        }
        return condition;
      });
    }

    // Proceed with creating new user account for the company
    const password = secureRandomPassword.randomPassword({
      length: 8,
      characters: [
        secureRandomPassword.lower,
        secureRandomPassword.upper,
        secureRandomPassword.digits,
      ],
    });
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    const passwordHash = await bcrypt.hash(password, salt);

    const userObj = {
      email,
      userName,
      password: passwordHash,
      isEmailVerified: true,
      createdBY: req.user,
      role: type === "300" ? "301" : "302",
      parentId: req.user,

      allowWorkFlow,
      allowTemplate,
      allowDocument,
      allowUser,
      allowCompany,
    };
    // create user
    const createdUser = await User.create(userObj);
    userObj.password = password;
    // Send welcome email to the user
    sendInvitationEmailToNewUser(userObj);

    // Return the response
    return res.status(201).send({
      success: true,
      message: "Company User Invite Send Successfully!",
      data: createdUser,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

function sendInvitationEmailToNewUser(userObj) {
  const subject = "Netrust Account Invitation";
  const to = userObj.email;
  const url = `${baseURL}login`;

  let emailBody = inviteUserViaEmailTemplate;
  emailBody = emailBody
    .replace("{{url}}", url)
    .replace("{{email}}", to)
    .replace("{{password}}", userObj.password);

  SendEmail(to, subject, emailBody);
}

exports.Deleting = async (req, res, next) => {
  try {
    const { id } = req.params;

    let userId = "";

    if (req.role === "301") {
      userId = mongoose.Types.ObjectId(req.user);
    } else if (req.role === "302") {
      userId = mongoose.Types.ObjectId(req.parentId);
    }

    const result = await User.remove({ _id: id });

    return res.send({
      success: true,
      message: " User Successfully!",
      data: result,
    });
  } catch (error) {
    res.send({ success: false, error });
    return next(error);
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      userName,
      allowWorkFlow,
      allowTemplate,
      allowDocument,
      allowUser,
      allowCompany,
    } = req.body;

    const updateDocument = {
      userName,
      allowWorkFlow,
      allowTemplate,
      allowDocument,
      allowUser,
      allowCompany,
    };

    try {


      const doc = await User.updateOne({ _id: id }, updateDocument, {
        upsert: true,
      }).exec();

      if (!doc) {
        return res.status(404).send({
          success: false,
          message: "User Not Found!",
        });
      }

      return res.status(200).send({
        success: true,
        message: "User Profile Updated Successfully!",
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: err.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
