var Documents = require("../models/documnets");
const { awsS3 } = require('../config/vars');

const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: awsS3.accessKeyId,
    secretAccessKey: awsS3.secretAccessKey,
});

function deletePDF(fileName) {
    fs.unlink(fileName, function () { });
}

const workerBaseUrl = process.env.workerBaseUrl;
var rp = require("request-promise");

module.exports = {
    async generatedPdfFile(id) {
        const fileObject = {
            filePath: `https://netrust-solution-bucket.s3.ap-southeast-1.amazonaws.com/${id}pdf`,
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
                        console.log("succesfully saved");
                    }
                );
                console.log("body", body);
            })
            .catch(function (err) {
                console.log("error", err);
            });
        return;
    },
};
