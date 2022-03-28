var Documents = require('../models/documnets');
var Template = require('../models/template');
var User = require('./../models/user');
var mongoose = require('mongoose');
const signerPath = process.env.signature;
var path = require('path');
const fs = require('fs');
const pdfGenerate = require('./pdfFileGenerate');
const emailGenerate = require('./mailEmail');
const { TEMPLATE_TYPES } = 'everyOne';



module.exports = {
    generateDocument(templateId, emailList, templateObj, templateType ,  isLocked ) {
        if(isLocked == null) {
            isLocked = false
        }
        var userId = '';
        var emailUser = [];
        emailList.map(function (email, index) {
            if (email != "") {
                var data = {
                    name: "",
                    email: email
                }
                emailUser.push(data);
            }

        })
        templateObj.roles.map(function (value, index) {
            if (value.email != "" && value) {
                var data = {
                    name: value.name,
                    email: value.email
                }
                emailUser.push(data);
            }

        })
        console.log(emailUser);
        var array = [];
        var status = "signed";
        if (templateType == "meAndOther" || templateType == "justOther") {
            status = "inprogress"
        }
        // if (TEMPLATE_TYPES.UNSIGNED == templateType) {
        //     status = templateType
        // }
        templateId.map(function (template, index) {
            array.push(new mongoose.Types.ObjectId(template))
        });
        var template_id = array[0];
        console.log("template_id", template_id);
        // __ __ User ID __ __ need to change //
        Template.findById(template_id, function (err, template) {
            if (err) {
                console.log(err);
                return;
            }
            else if (!template) {
                console.log("No template found to create Document!");
            }
            else {
                userId = template.userId;
                var Document = new Documents();
                Document.status = status;
                Document.title = templateObj.templateTitle;
                Document.userId = templateObj.userId;
                Document.signers = emailUser;
                Document.templates = array;
                Document.flowType = templateObj.flowType;
                Document.inUse = true;
                Document.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        // __ Document Generated Successfully __ //
                        Documents.aggregate(
                            [
                                // __ __ Find the document __ __ //
                                {
                                    "$match": {
                                        "_id": new mongoose.Types.ObjectId(Document._id)
                                    }
                                },
                                {
                                    "$unwind": "$templates"
                                },
                                // __ __  Lookup matching __ __ //
                                {
                                    "$lookup": {
                                        "from": "templates",
                                        "localField": "templates",
                                        "foreignField": "_id",
                                        "as": "templateObjects"
                                    }
                                },
                                // __ __ Unwind result arr  __ __ //
                                {
                                    "$unwind": "$templateObjects"
                                },
                                // __ __ Group back  arrays __ __ //
                                {
                                    "$group": {
                                        "_id": "$_id",
                                        "templates": {
                                            "$push": "$templates"
                                        },
                                        "templateObjects": {
                                            "$push": "$templateObjects"
                                        }
                                    }
                                }
                            ], async function (err, document) {
                                // __ __ For API Log __ __ //
                                // _______________________ //

                                if (document.length === 0) {
                                    console.log("No Document Found")
                                }
                                else {
                                    var templatesObjs = document[0].templateObjects;

                                    console.log(templateObj);

                                    // var customFields = customFields;
                                    templatesObjs.map(function (template, tempIndex) {
                                        templatesObj = template;
                                        // __ __ Fields Map __ __ //
                                        // ______________________ //
                                        templatesObj.templateFields.map(function (fields, index) {
                                            if (fields.type == 1 || fields.type == 2) {
                                                var count = 0;
                                                var name = Date.now()
                                                var savePath1 = "/signature/" + name;
                                                var savePath = './..' + signerPath + "/" + name;
                                                var filePath = path.join(__dirname, savePath);
                                                fields.value = fields.value ? fields.value : "";
                                                var splitImg = fields.value.split("base64,");
                                                var imgType = splitImg[0];
                                                

                                                fields.value = fields.value ? fields.value : "";
                                                if (imgType == "data:image/png;" && count == 0) {
                                                    let data = fields.value.replace(/^data:image\/png;base64,/, "");
                                                    fs.writeFileSync(filePath + ".png", data, 'base64');
                                                    fields.value = savePath1 + ".png"
                                                    console.log(fields.value);
                                                    count = 1;
                                                } else if(imgType == "data:image/jpeg;" && count == 0){
                                                    let data = fields.value.replace(/^data:image\/jpeg;base64,/, "");
                                                    fs.writeFileSync(filePath + ".jpeg", data, 'base64');
                                                    fields.value = savePath1 + ".png"
                                                    console.log(fields.value);
                                                    count = 1;

                                                }else if (imgType == "" && count == 0) {
                                                    fields.value = fields.value ? fields.value : "";
                                                    count = 1;
                                                }
                                               
                                            }
                                            else if (fields.name) {
                                                fields.value = fields.value ? fields.value : "";
                                            }
                                        })
                                    });

                                  await  Documents.update(
                                        {
                                            _id: Document._id
                                        },
                                        {
                                            status: status,
                                            documentJSON: templatesObjs,
                                            isLocked:  isLocked
                                        },
                                        async function (err, response) {
                                            console.log(err)
                                           pdfGenerate.generatedPdfFile(Document.id);
                                            var UserData = await User.findOne({_id : userId}).exec(); 
                                            if (templateType == "justMe") {
                                                for (var i = 0; emailList.length > i; i++) {
                                                    emailGenerate.emailGenerate(Document.id, templateObj.userId, emailList[i], templateType, emailList ,  templateObj.templateMessage ,templateObj.templateTitle);
                                                }
                                                if(UserData.emailMeCopy){
                                                    emailGenerate.emailGenerate(Document.id, templateObj.userId, UserData.email , templateType, emailList ,  templateObj.templateMessage ,templateObj.templateTitle);
                                                }
                                            }

                                            if (templateType == "meAndOther" || templateType == "justOther") {
                                                const emails = [];
                                                if (templateObj.roles && templateObj.roles.length){
                                                    if(templateObj.flowType === 'serial'){
                                                        emails.push(templateObj.roles[0].email);
                                                    }else{
                                                        templateObj.roles.forEach(role => emails.push(role.email));
                                                    }
                                                }
                                                if(templateObj.flowType === 'serial'){
                                                    emailGenerate.emailGenerate(Document.id, templateObj.userId, emails[0], templateType, emails,  templateObj.templateMessage ,templateObj.templateTitle, templateObj);
                                                }else {
                                                    for (var i = 0; templateObj.roles.length > i; i++) {
                                                        emailGenerate.emailGenerate(Document.id, templateObj.userId, template.roles[i].email, templateType, emails,  templateObj.templateMessage ,templateObj.templateTitle, templateObj);
                                                    }
                                                }
                                                
                                            }

                                            // if (templateType == TEMPLATE_TYPES.UNSIGNED) {
                                            //     let email = [];
                                            //     email.push(emailList[0]);
                                            //     emailGenerate.emailGenerate(Document.id, templateObj.userId, emailList[0], templateType , email  ,templateObj.templateMessage ,templateObj.templateTitle).catch(err => {
                                            //         console.log(err);
                                            //     })
                                            // }

                                        })
                                }
                            });
                    }
                });
            }
        });
    },
    generateSharedTemplateDocument(templateId, emailList, payload, userId , templateObjects , title , subject  ) {
        var status = "inprogress"
        // __ __ User ID __ __ need to change //
        var Document = new Documents();
        Document.status = status;
        Document.title = payload.templateTitle;
        Document.userId = userId;
        Document.signers = emailList;
        Document.templates = templateId;
        Document.inUse = true;
        Document.save(function (err) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                var templatesObjs = templateObjects;
                // var customFields = customFields;
                templatesObjs.map(function (template, tempIndex) {
                    templatesObj = template;
                    // __ __ Fields Map __ __ //
                    // ______________________ //
                    templatesObj.templateFields.map(function (fields, index) {
                        if (fields.type == 1 || fields.type == 2) {
                            var count = 0;
                            var name = Date.now()
                            var savePath1 = "/signature/" + name;
                            var savePath = './..' + signerPath + "/" + name;
                            var filePath = path.join(__dirname, savePath);
                            fields.value = fields.value ? fields.value : "";
                            var splitImg = fields.value.split("base64,");
                            var imgType = splitImg[0];
                            

                            fields.value = fields.value ? fields.value : "";
                            if (imgType == "data:image/png;" && count == 0) {
                                let data = fields.value.replace(/^data:image\/png;base64,/, "");
                                fs.writeFileSync(filePath + ".png", data, 'base64');
                                fields.value = savePath1 + ".png"
                                console.log(fields.value);
                                count = 1;
                            } else if(imgType == "data:image/jpeg;" && count == 0){
                                let data = fields.value.replace(/^data:image\/jpeg;base64,/, "");
                                fs.writeFileSync(filePath + ".jpeg", data, 'base64');
                                fields.value = savePath1 + ".png"
                                console.log(fields.value);
                                count = 1;

                            }else if (imgType == "" && count == 0) {
                                fields.value = fields.value ? fields.value : "";
                                count = 1;
                            }
                           
                        }
                        else if (fields.name) {
                            fields.value = fields.value ? fields.value : "";
                        }
                    })
                });
                Documents.update(
                    {
                        _id: Document._id
                    },
                    {
                        status: status,
                        documentJSON: templatesObjs
                    },
                    function (err, response) {
                        console.log(err)
                        pdfGenerate.generatedPdfFile(Document.id);
                            const emails = [];
                            if (emailList.length > 0)
                                emailList.forEach(role => emails.push(role.email));
                            for (var i = 0; emailList.length > i; i++) {
                                // emailGenerate.emailGenerate(Document.id, templateObj.userId, template.roles[i].email, templateType, emails);
                                emailGenerate.emailGenerate(Document.id,  userId , emailList[i].email, "meAndOther" , emails , subject   , title  );
                            }
                    })
            }
        });
    },
    generateGmailDocument(templateId, emailList, templateObj, templateType ,  isLocked ) {
        return new Promise(function (resolve, reject) {
            if(isLocked == null) {
                isLocked = false
            }
            var userId = '';
            var emailUser = [];
         
            var array = [];
            var status = "signed";
            if (templateType == "meAndOther" || templateType == "justOther") {
                status = "inprogress"
            }
            if (TEMPLATE_TYPES.UNSIGNED == templateType) {
                status = templateType
            }
            templateId.map(function (template, index) {
                array.push(new mongoose.Types.ObjectId(template))
            });
            var template_id = array[0];
            console.log("template_id", template_id);
            // __ __ User ID __ __ need to change //
            Template.findById(template_id, function (err, template) {
                if (err) {
                    console.log(err);
                    return;
                }
                else if (!template) {
                    console.log("No template found to create Document!");
                }
                else {
                    userId = template.userId;
                    var Document = new Documents();
                    Document.status = status;
                    Document.title = templateObj.templateTitle;
                    Document.userId = templateObj.userId;
                    Document.signers = emailUser;
                    Document.templates = array;
                    Document.inUse = true;
                    Document.save(function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        else {
                            // __ Document Generated Successfully __ //
                            Documents.aggregate(
                                [
                                    // __ __ Find the document __ __ //
                                    {
                                        "$match": {
                                            "_id": new mongoose.Types.ObjectId(Document._id)
                                        }
                                    },
                                    {
                                        "$unwind": "$templates"
                                    },
                                    // __ __  Lookup matching __ __ //
                                    {
                                        "$lookup": {
                                            "from": "templates",
                                            "localField": "templates",
                                            "foreignField": "_id",
                                            "as": "templateObjects"
                                        }
                                    },
                                    // __ __ Unwind result arr  __ __ //
                                    {
                                        "$unwind": "$templateObjects"
                                    },
                                    // __ __ Group back  arrays __ __ //
                                    {
                                        "$group": {
                                            "_id": "$_id",
                                            "templates": {
                                                "$push": "$templates"
                                            },
                                            "templateObjects": {
                                                "$push": "$templateObjects"
                                            }
                                        }
                                    }
                                ], async function (err, document) {
                                    // __ __ For API Log __ __ //
                                    // _______________________ //
    
                                    if (document.length === 0) {
                                        console.log("No Document Found")
                                    }
                                    else {
                                        var templatesObjs = document[0].templateObjects;
    
                                        console.log(templateObj);
    
                                        // var customFields = customFields;
                                        templatesObjs.map(function (template, tempIndex) {
                                            templatesObj = template;
                                            // __ __ Fields Map __ __ //
                                            // ______________________ //
                                            templatesObj.templateFields.map(function (fields, index) {
                                                if (fields.type == 1 || fields.type == 2) {
                                                    var count = 0;
                                                    var name = Date.now()
                                                    var savePath1 = "/signature/" + name;
                                                    var savePath = './..' + signerPath + "/" + name;
                                                    var filePath = path.join(__dirname, savePath);
                                                    fields.value = fields.value ? fields.value : "";
                                                    var splitImg = fields.value.split("base64,");
                                                    var imgType = splitImg[0];
                                                    
    
                                                    fields.value = fields.value ? fields.value : "";
                                                    if (imgType == "data:image/png;" && count == 0) {
                                                        let data = fields.value.replace(/^data:image\/png;base64,/, "");
                                                        fs.writeFileSync(filePath + ".png", data, 'base64');
                                                        fields.value = savePath1 + ".png"
                                                        console.log(fields.value);
                                                        count = 1;
                                                    } else if(imgType == "data:image/jpeg;" && count == 0){
                                                        let data = fields.value.replace(/^data:image\/jpeg;base64,/, "");
                                                        fs.writeFileSync(filePath + ".jpeg", data, 'base64');
                                                        fields.value = savePath1 + ".png"
                                                        console.log(fields.value);
                                                        count = 1;
    
                                                    }else if (imgType == "" && count == 0) {
                                                        fields.value = fields.value ? fields.value : "";
                                                        count = 1;
                                                    }
                                                   
                                                }
                                                else if (fields.name) {
                                                    fields.value = fields.value ? fields.value : "";
                                                }
                                            })
                                        });
    
                                      await  Documents.update(
                                            {
                                                _id: Document._id
                                            },
                                            {
                                                status: status,
                                                documentJSON: templatesObjs,
                                                isLocked:  isLocked
                                            },
                                            async function (err, response) {
                                                console.log(err)
                                               pdfGenerate.generatedPdfFile(Document.id);
                                                var UserData = await User.findOne({_id : userId}).exec(); 
                                                if (templateType == "justMe") {
                                                    resolve( Document._id);
                                                }
                                            })
                                    }
                                });
                        }
                    });
                }
            });
        });
    },
}