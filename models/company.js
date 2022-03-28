const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    favIcon: { type: String, default: '' },
    avatar: { type: String, default: '' },
    webUrl: { type: String, default: '' },
    companyDomain: { type: String, default: '', trim: true, lowercase: true },
    companyName: { type: String, default: '', trim: true, lowercase: true },
    industry: { type: String, default: '' },
    noEmployee: { type: String, default: '' },
    location: { type: String, default: '' },
    city: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    dignoScore: { type: Number, default: 0 },
    isOnboardingComplete: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, requires: true, default: Date.now },
});

module.exports = mongoose.model('company', companySchema);
