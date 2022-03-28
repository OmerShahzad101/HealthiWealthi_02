const mongoose = require('mongoose');

// Setup schema
const filesSchema = new mongoose.Schema({
    filename: {
        type: Array,
        //required: 'FileNameInvalid'
    },
    templateid: {
        type: String,
        required: 'TemplateIdInvalid'
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('files', filesSchema);

// const mongoose = require('mongoose');

// const departmentSchema = new mongoose.Schema({
//     name: { type: String, requires: true },
//     identifier: { type: String, requires: true, trim: true, lowercase: true },
//     dignoScore: { type: Number, default: 0 },
//     deptHeadId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
//     createdAt: { type: Date, requires: true, default: Date.now },
// });

// module.exports = mongoose.model('rd', departmentSchema);
