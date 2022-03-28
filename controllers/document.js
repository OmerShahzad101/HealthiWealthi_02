const mongoose = require("mongoose");
const emailGenerate = require('../_utils/mailEmail');
const Documents = require("../models/documnets");
const User = require("../models/user");

const { awsS3 } = require("../config/vars");

const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: awsS3.accessKeyId,
  secretAccessKey: awsS3.secretAccessKey,
});

function deletePDF(fileName) {
  fs.unlink(fileName, function () {});
}

const workerBaseUrl = process.env.workerBaseUrl;
var rp = require("request-promise");

exports.makeDoc = async function (req, res) {
  const id = req.body.id;
  const filePath = `https://netrust-solution-bucket.s3.ap-southeast-1.amazonaws.com/${id}.pdf`;
  const fileObject = {
    filePath,
    id,
  };

  var options = {
    method: "POST",
    uri: `${workerBaseUrl}`,
    form: fileObject,
    headers: {},
  };

  await rp(options)
    .then(function (body) {
      var queryForNow = { _id: id };
      Documents.findOneAndUpdate(
        queryForNow,
        { createdPDF: true },
        { upsert: true },
        function (err, doc) {
          if (err) console.log(err);
          console.log(" successfully saved");
        }
      );

      return res.json({
        status: true,
        message: "PDF generated successfully!",
        data: filePath,
      });
    })
    .catch(function (err) {
      console.log("error", err);
    });
};

exports.get = function (req, res) {
  var id = new mongoose.Types.ObjectId(req.body.id);
  Documents.findOne({ _id: id }, function (err, document) {
    if (err) {
      res.status(200).json({
        success: false,
        message: " Not Found!",
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        message: "Document retrieved successfully!",
        data: document,
      });
      return;
    }
  });
};

exports.new = async function (req, res) {
  if (typeof req.body.id !== "undefined") {
    if (req.body.signerEmail !== undefined) {
      var DocumnetJson = JSON.parse(req.body.documentJSON);
      var status = "";
      var email = req.body.signerEmail;
      var document = await Documents.findOne({ _id: req.body.id }).exec();
      var userId = document.userId;
      var UserData = await User.findOne({ _id: userId }).exec();
      var documentJSON = document.documentJSON;
      var signerEmail = document.signers;
      // console.log(documentJSON);

      signerEmail.map((value, indexValue) => {
        if (value.email === email) {
          value.signed = true;
        }
      });

      var count = 0;
      signerEmail.map((value, fieldIndex) => {
        if (count == 0) {
          if (value.signed) {
            status = "signed";
          } else {
            count = 1;
            status = "inprogress";
          }
        }
      });

      if (count === 1 && document.flowType === "serial") {
        for (let x = 0; signerEmail.length > x; x++) {
          let obj = signerEmail[x];
          let obj2 = signerEmail[x+1];
          if (obj.email === email) {

            emailGenerate.emailGenerate(document.id, userId, obj2.email, "meAndOther", obj2.email, DocumnetJson[0].templateMessage, DocumnetJson[0].templateTitle);

          }
        }
      }

      console.log(documentJSON);
      console.log(DocumnetJson);

      documentJSON.map((template, templateIndex) => {
        var templateId = template._id.toString();
        template.templateFields.map((field, Index) => {
          DocumnetJson.map((value, filedIndex) => {
            var newDataTempId = value._id.toString();
            if (newDataTempId == templateId) {
              value.templateFields.map((tem, termIndex) => {
                if (
                  field.role === email &&
                  Index == termIndex &&
                  field.name === tem.name
                ) {
                  template.templateFields[Index].value = tem.value;
                }
              });
            }
          });
        });
      });
      console.log(documentJSON);
      // return
      Documents.update(
        {
          _id: req.body.id,
        },
        {
          status: status,
          signers: signerEmail,
          documentJSON: documentJSON,
        },
        function (err, response) {
          res.status(200).json({
            status: true,
            message: "Document Signed",
            data: response,
          });
          if (status == "signed") {
              var userEmail = [];
              signerEmail.map((value, indexValue) => {
                  userEmail.push(value.email)
              })

              // if (UserData.emailMeCopy) {
              //     emailGenerate.emailGenerate(document.id, userId, UserData.email, "justMe", userEmail, DocumnetJson[0].templateMessage, DocumnetJson[0].templateTitle);
              // }
              if (true) {
                  const emails = [];
                  if (signerEmail)
                      signerEmail.forEach(role => emails.push(role.email));
                  for (var i = 0; signerEmail.length > i; i++) {
                    emailGenerate.emailGenerate(document.id, userId, signerEmail[i].email, "justMe", userEmail, DocumnetJson[0].templateMessage, DocumnetJson[0].templateTitle);
                  }
              }
          }
        }
      );
    } else {
      Documents.update(
        {
          _id: req.body.id,
        },
        {
          status: req.body.status,
          documentJSON: JSON.parse(req.body.documentJSON),
        },
        function (err, response) {
          // __ __ For API Log __ __ //
          // _______________________ //
          const fs = require("fs");
          var Calllog = new Calllogs();
          Calllog.appId = new mongoose.Types.ObjectId(req.body.appId);
          Calllog.log = 1;
          Calllog.documentId = req.body.id;
          Calllog.description = "Map Fields on Document";
          Calllog.save(function () {});
          res.json({
            status: "success",
            message: "Document Signed",
            data: response,
          });
        }
      );
    }
  } else {
    // console.log(req.body);
    // return
    var isLocked = false;
    var email = req.body.email;
    var documentJSON = req.body.documentJSON;
    var array = [];
    array.push(new mongoose.Types.ObjectId(req.body.templates[0]));
    //Pricing and package Check

    var template_id = array[0];
    var template = await Template.findById(template_id).exec();

    var functionCheck = false;
    //appId Check
    var userId = new mongoose.Types.ObjectId(template.userId);
    var UserData = await User.findOne({ _id: userId }).exec();
    if (UserData.role == "user" || UserData.role == "sub-user") {
      var transection = await Payments.find({
        userId: UserData.id,
        paymentType: "pricing",
      }).exec();
      current_Payment = await transection[transection.length - 1];
      if (current_Payment == undefined) {
        res.json({
          status: "false",
          message: "No pricing package!",
        });
        return;
      }
      // if (current_Payment.expire == true) {
      //     res.json({
      //         status: "false",
      //         message: "package is expire!"
      //     });
      //     return
      // }
      var document = await userPackageStat.getUserDocument(
        current_Payment,
        userId
      ); // get user document count
      if (current_Payment.totalDocument != -1) {
        if (current_Payment.totalDocument > document.length) {
          functionCheck = true;
        } else {
          isLocked = true;
          functionCheck = true;
          // res.json({
          //     status: "warning",
          //     message: 'Please upgrade your account in order to access this feature',
          // });
          // return;
        }
      } else {
        functionCheck = true;
      }
      // functionCheck = true;
    }
    if (UserData.role == "admin" || UserData.role == "Super Admin") {
      functionCheck = true;
    }
    if (functionCheck) {
      var template_id = array[0];
      Template.findById(template_id, function (err, template) {
        console.log("template", template);
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
          return;
        } else if (!template) {
          res.json({
            status: "failure",
            message: "No template found to create Document!",
          });
        } else {
          var follow_up = 0;
          if (typeof req.body.follow_up !== "undefined") {
            follow_up = req.body.follow_up;
          }
          var data = [{ email: email }];
          var userId = template.userId;
          var Document = new Documents();
          Document.title = template.templateTitle;
          Document.status = "signed";
          Document.follow_up = follow_up;
          Document.userId = userId;
          Document.documentJSON = documentJSON;
          Document.message = template.templateMessage;
          Document.signers = data;
          Document.templates = array;
          Document.isLocked = isLocked;
          Document.save(function (err) {
            if (err) {
              res.json({
                status: "error",
                message: err,
              });
              return;
            }
            res.json({
              status: "success",
              message: "New document created!",
              data: Document,
            });

            if (UserData.emailMeCopy) {
              emailGenerate(
                Document.id,
                userId,
                UserData.email,
                "justMe",
                data,
                template.templateMessage,
                template.templateTitle
              );
            }
            if (UserData.emailMeOther) {
              const emails = [];
              emails.push(email);
              emailGenerate(
                Document.id,
                userId,
                email,
                "justMe",
                data,
                template.templateMessage,
                template.templateTitle
              );
            }

            var temlateLink = new TemplateLink();
            temlateLink.userId = userId;
            temlateLink.templateId = template_id;
            temlateLink.documentId = Document._id;
            temlateLink.email = email;
            temlateLink.save();
          });
        }
      });
    }
  }
};

exports.index = async (req, res) => {
  try {
    const payload = req.body;
    const { text , type } = payload;
    let { pageNumber, rowsPerPage } = payload;


    let userId = '';
    if (req.role === '301') {
        userId = mongoose.Types.ObjectId(req.user);
    } else if (req.role === '302') {
        userId = mongoose.Types.ObjectId(req.parentId);
    }


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

    const queryObject = {};
    if (text) {
      queryObject.$or = [{ title: new RegExp(text, "i") }];
    }
   
    if(type && type != 'all'){
      queryObject.status = type;
    }

    if(userId){
      queryObject.userId = userId;
    }

    const pipeline = [
      {
        $match: queryObject,
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $limit: pageNumber * rowsPerPage + rowsPerPage,
      },
      {
        $skip: pageNumber * rowsPerPage,
      },
      // {
      //     $project: {
      //         _id: 1,
      //         webUrl: 1,
      //         companyDomain: 1,
      //         companyName: 1,
      //         industry: 1,
      //         noEmployee: 1,
      //         location: 1,
      //         city: 1,
      //         isActive: 1,
      //         dignoScore: 1,
      //         dignoId: { $arrayElemAt: ['$digno.dignoId', 0] },
      //     },
      // },
    ];

    try {
      const documents = await Documents.aggregate(pipeline).exec();
      const count = await Documents.countDocuments(queryObject).exec();

      return res
        .status(200)
        .json({
          success: true,
          message: "Company Retrieved Successfully!",
          documents,
          count,
        });
    } catch (err) {
      console.log({ err });
      return res.status(404).send({
        success: false,
        message: err,
      });
    }
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};


exports.Deleting = async (req, res, next) => {
  try {
      const { id } = req.params;

      let userId = '';

      if (req.role === '301') {
          userId = mongoose.Types.ObjectId(req.user);
      } else if (req.role === '302') {
          userId = mongoose.Types.ObjectId(req.parentId);
      }

      const result = await Documents.remove({ _id: id });

      return res.send({ success: true, message: 'Reward Deleted Successfully!', data: result });
  } catch (error) {
      res.send({ success: false, error });
      return next(error);
  }
};




exports.Rejection = async (req, res, next) => {
  try {
      const { id } = req.params;

      const  updateDocument  = {
        status : "declined"
      }

      const doc = await Documents.updateOne({ _id: id }, updateDocument, {
        upsert: true,
      }).exec();

    
      return res.send({ success: true, message: 'Reward Deleted Successfully!', data: doc });
  } catch (error) {
      res.send({ success: false, error });
      return next(error);
  }
};