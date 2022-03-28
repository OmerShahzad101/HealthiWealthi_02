const mongoose = require('mongoose');

const DocumentsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'titleInvalid'
    },
    status: {
        type: String,
        required: 'statusInvalid'
    },
    documentJSON: {
        type: Array,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    templates: {
        type: Array,
        required: "arrayInvalid"
    },
    message: {
        type: String,
    },
    subject: {
        type: String,
    },
    signers: {
        type: Array,
    },
    createdPDF: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    follow_up: {
        type: Number,
    },
    appId: {
        type: String,
    },
    inUse :{
        type: Boolean,
        default: true
    },
    mode:{
        type: String,
        default: "-1"
    },
    declineBy:{
        type: String
    },
    declineReason: {
        type: String
    },
    flowType: {
        type: String
    },
    isLocked: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('Document', DocumentsSchema);