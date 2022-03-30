const mailHelper = require('./mailHelper');
const htmlHelper = require('./dynamicHtmlHelper');
// const { adminConfig } = require('../config');
const { baseURL } = require('../config/vars');
// const { TEMPLATE_TYPES } = require('../comman/enums');
const userModel = require('../models/user');
var mongoose = require('mongoose');
module.exports = {
    async emailGenerate(documentId , userId, email , templateType, emails , subject , title, templateObject){
        var userData = await userModel.findOne({_id: userId});
        var emailEncode = encodeURIComponent(email);

        const mailData = {
            signers: emails,
            subject : subject,
            title :  title,
            firstname: userData.userName,
            currentYear: new Date().getFullYear(),
        }

        let emailsubject = '';
        if(templateType == "meAndOther" || templateType == "justOther"){ //url for mutilpe signer
            mailData.docUrl = `${baseURL}sign-document/${documentId}?email=${emailEncode}`;
            emailsubject = "Drop Your Signature";
            
        }

        if(templateType == "justMe"){ //url for mutilpe signer
            mailData.docUrl = `https://netrust-solution-bucket.s3.ap-southeast-1.amazonaws.com/${documentId}.pdf`
            emailsubject = "Successfully Sign Document";
        }

        // if(templateType == TEMPLATE_TYPES.UNSIGNED){ //url for single signer
        //     mailData.docUrl = `${baseURL}sign-document/${documentId}`
        // }
        const {html} = await htmlHelper.makeHtml("signed.html", mailData)
        await mailHelper.send(email, "Document", html, emailsubject)
    }
}


