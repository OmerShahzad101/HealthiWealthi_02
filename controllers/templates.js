const fs = require("fs");
PDFParser = require("pdf2json");
var pdf2img = require("pdf2img");
var cmd = require("node-cmd");
const path = require("path");
const imagesToPdf = require("images-to-pdf");
const image2base64 = require("image-to-base64");
var Templates = require("../models/template");
const mongoose = require("mongoose");
const pdfGenerate = require("../_utils/documentGenerate");
var generateDocument = require("../_utils/documentGenerate");
const Documents = require("../models/documnets");

// sudo add-apt-repository ppa:dhor/myway
// sudo apt-get update
// sudo apt-get install graphicsmagick
// sudo apt-get install imagemagick

exports.new = function (req, res) {
  const savePath = path.join(__dirname, "../upload/");

  var width = 0;
  var height = 0;
  console.log("coming for new files here");
  var name = req.files[0].filename;
  var ex = name.split(".");
  if (ex[1] == "pdf" || ex[1] == "png" || ex[1] == "jpeg") {
    console.log("right file");
  } else {
    res.status(200).json({
      success: false,
      message: "Only .jpg, .png and .pdf formats are allowed.",
    });
    return;
  }
  var filesArray = [];
  if (req.files.length > 1) {
    for (var i = 0; i < req.files.length; i++) {
      filesArray.push(req.files[i].filename);
    }
    var template = new Templates();
    template.templateFileName = name;
    template.created = false;
    template.templateFiles = filesArray;
    template._id = template._id;
    template.filename = filesArray;
    template.disable = true;
    template.save(function (err) {
      if (err) {
        res.status(200).json(err);
        return;
      }
      res.status(200).json({
        success: true,
        message: "File Uploaded!",
        data: { template: template, filesArray: filesArray },
      });
    });
  } else {
    if (req.files[0].mimetype.split("/")[1] === "pdf") {
      let pdfParser = new PDFParser();

      pdfParser.loadPDF(savePath + req.files[0].filename); // ex: ./abc.pdf

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        console.log(pdfData);
        width = Math.round(pdfData.Width / 4.5); // pdf width
        height = Math.round(pdfData.Height / 4.5); // page height

        console.log(`Height : ${height} in inch`);
        console.log(`Width : ${width} in inch`);
      });

      var pdfFileName = req.files[0].filename;
      var input = savePath + req.files[0].filename;
      pdf2img.setOptions({
        type: "png",
        outputdir: savePath,
        outputname: "nem-file-" + Date.now(),
      });
      pdf2img.convert(input, function (err, images) {
        if (err) {
          res.status(200).json(err);
          return;
        } else {
          for (let i = 0; i < images.message.length; i++) {
            console.log(images.message);
            filesArray.push(images.message[i].name);
          }
          var template = new Templates();
          template.created = false;
          template.templateFileName = name;
          template.templateFiles = filesArray;
          template._id = template._id;
          template.filename = filesArray;
          template.width = width * 92;
          template.height = height * 92;
          template.disable = true;
          template.save(function (err) {
            if (err) {
              res.status(200).json(err);
              return;
            }
            res.status(200).json({
              success: true,
              message: "New File Uploaded!",
              data: { template: template, filesArray: filesArray },
            });
            fs.rename(
              savePath + pdfFileName,
              savePath + template._id + ".pdf",
              function (err) {
                if (err) console.log("ERROR: " + err);
                else {
                  console.log("pdf file name change");
                }
              }
            );
            cmd.run(
              `cp  ${savePath}${template._id}.pdf  ../nutresmain/upload/templates/${template._id}.pdf`,
              // `pwd`,
              function (err, data, stderr) {
                if (!err) {
                  console.log(
                    "the node-cmd cloned dir contains these files :\n\n",
                    data
                  );
                } else {
                  console.log("error", err);
                }
              }
            );
          });
        }
      });
    } else {
      filesArray.push(req.files[0].filename);
      var template = new Templates();
      template.created = false;
      template.templateFileName = name;
      template.templateFiles = filesArray;
      template._id = template._id;
      template.filename = filesArray;
      template.disable = true;
      template.save(async function (err) {
        if (err) {
          res.status(200).json(err);
          return;
        }
        res.status(200).json({
          success: true,
          message: "New File Uploaded!",
          data: { template: template, filesArray: filesArray },
        });
        var path = "/upload/" + req.files[0].filename;

        image2base64(appRoot + path) // you can also to use url
          .then(async (response) => {
            if (ex[1] == "png") {
              var png = await fs.writeFileSync(
                appRoot + path,
                response,
                "base64"
              );
            } else if (ex[1] == "jpeg") {
              var jpeg = await fs.writeFileSync(
                appRoot + path,
                response,
                "base64"
              );
            }
            console.log("/upload/" + template._id + ".pdf");
            var data = await imagesToPdf(
              [appRoot + path],
              savePath + template._id + ".pdf"
            );
            console.log(data);
            cmd.get(
              `cp  ${savePath}${template._id}.pdf   ../nutresmain/upload/templates/${template._id}.pdf`,
              // `pwd`,
              function (err, data, stderr) {
                if (!err) {
                  console.log(
                    "the node-cmd cloned dir contains these files :\n\n",
                    data
                  );
                } else {
                  console.log("error", err);
                }
              }
            );
          })
          .catch((error) => {
            console.log(error); //Exepection error....
          });
      });
    }
  }
};

exports.CreateTemplate = function (req, res) {
  var type = "everyOne";
  var { mode } = req.body;
  if (mode == undefined || mode == "") {
    var mode = "1"; // mode for Gui
  } else {
    var mode = "2"; // -1 mode gui package and 1 mode for api package
  }

  if (req.body.type) {
    type = req.body.type;
  }

  let userId = "";
  if (req.role === "301") {
    userId = mongoose.Types.ObjectId(req.user);
  } else if (req.role === "302") {
    userId = mongoose.Types.ObjectId(req.parentId);
  } else {
    userId = req.user;
  }

  Templates.findById(
    new mongoose.Types.ObjectId(req.body.templateId),
    function (err, template) {
      if (err) {
        res.send(err);
      } else {
        template.roles = req.body.rolesAdded;
        template.templateMessage = req.body.templateMessage;
        template.templateTitle = req.body.templateTitle;
        template.templateFiles = req.body.filesArray;
        template.templateFields = req.body.draggedElementsArray;
        template.created = true;
        template.disable = false;
        template.mode = mode;
        template.userId = userId;
        template.email = req.body.emailList;
        template.create_date = new Date();
        (template.type = type),
          (template.flowType = req.body.flowType),
          (template.linkType = req.body.linkType),
          // save the template and check for errors
          template.save(function (err, doc) {
            if (err) {
              res.status(200).json({
                success: false,
                message: err,
              });
              return;
            } else {
              res.status(200).json({
                success: true,
                message: "Template Create",
                data: template,
              });
            }
            var templateId = [];
            templateId.push(template.id);
            if (mode == "1") {
              if (req.body.type == "justOther") {
                generateDocument.generateDocument(
                  templateId,
                  req.body.emailList,
                  template,
                  req.body.type
                );
              }
            }

            return;
          });
      }
    }
  );
};

exports.getTemplates = function (req, res) {
  Documents.aggregate(
    [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.body.id),
        },
      },
      {
        $unwind: "$templates",
      },
      {
        $lookup: {
          from: "templates",
          localField: "templates",
          foreignField: "_id",
          as: "templateObjects",
        },
      },
      {
        $unwind: "$templateObjects",
      },
      {
        $group: {
          _id: "$_id",
          templates: {
            $push: "$templates",
          },
          templateObjects: {
            $push: "$templateObjects",
          },
        },
      },
    ],
    function (err, document) {
      if (err) {
        res.status(200).json({
          success: false,
          message: err,
        });
        return;
      } else if (document.length === 0) {
        res.status(200).json({
          success: false,
          data: [],
        });
      } else {
        res.status(200).json({
          success: true,
          data: document[0],
        });
        return;
      }
    }
  );
};

exports.index = async (req, res) => {
  try {
    const payload = req.body;
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

    const queryObject = {};
    if (text) {
      queryObject.$or = [{ templateTitle: new RegExp(text, "i") }];
    }

    let userId = "";
    if (req.role === "301") {
      userId = mongoose.Types.ObjectId(req.user);
    } else if (req.role === "302") {
      userId = mongoose.Types.ObjectId(req.parentId);
    }

    if (queryObject.userId) {
      queryObject.userId = userId;
    }

    queryObject.mode = "2";
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
      const documents = await Templates.aggregate(pipeline).exec();
      const count = await Templates.countDocuments(queryObject).exec();

      return res.status(200).json({
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

    let userId = "";

    if (req.role === "301") {
      userId = mongoose.Types.ObjectId(req.user);
    } else if (req.role === "302") {
      userId = mongoose.Types.ObjectId(req.parentId);
    }

    const result = await Templates.remove({ _id: id });

    return res.send({
      success: true,
      message: "Reward Deleted Successfully!",
      data: result,
    });
  } catch (error) {
    res.send({ success: false, error });
    return next(error);
  }
};
