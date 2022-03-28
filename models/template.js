const mongoose = require('mongoose');

// Setup schema
const TemplatessSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    templateTitle: {
        type: String
    },
    templateFileName: {
        type: String
    },
    templateMessage: {
        type: String
    },
    roles: {
        type: Object
    },
    templateFields: {
        type: Array
    },
    templateFiles: {
        type: Array
    },
    width :{
        type: String
    },
    height : {
        type: String
    },
    created:{
        type:Boolean
    },
    disable:{
         type: Boolean,
         default: false
    },
    process:{
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },  
    type:{
        type: String
    },
    email: {
        type: Array
    },
    flowType: {
        type: String
    },
    mode:{
        type: String,
        default: "-1"
    },
    linkType:{
        type: Number,
        default: 0
    }  
});



module.exports = mongoose.model('Templates', TemplatessSchema);