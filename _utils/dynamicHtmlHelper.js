const cons = require('consolidate');
const dir = __dirname + "/../static/emailTemplates";
console.log(dir);
function makeHtml (filename, data) {
    return new Promise((resolve, reject) => {
        cons.swig(dir + "/" + filename, data, (err, html) => {
            if (err) return reject({err});
            return resolve({html});
        });
    })
}

module.exports = {
    makeHtml
}