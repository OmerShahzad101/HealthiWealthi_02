const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const { awsS3 } = require('../config/vars');

const s3 = new AWS.S3({
    accessKeyId: awsS3.accessKeyId,
    secretAccessKey: awsS3.secretAccessKey,
});

exports.sendFileS3Bucket = (fileName) => {
    const filePath = path.join(__dirname, `../upload/${fileName}`);
    const fileToDownload = fileName;

    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: 'netrust-solution-bucket',
            Key: fileToDownload,
            ContentType: 'image/png',
            Body: data,
        };
        s3.upload(params, (s3Err) => {
            if (s3Err) throw s3Err;
            else {
                deletePDF(filePath);
            }
        });
    });
};

function deletePDF(filePath) {
    fs.unlink(filePath, () => {
        console.log(`${filePath} was deleted`);
    });
}
