const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    trialDays: { type: Number, default: 7 },
    departments: { type: Number, default: 3 },
    apps: { type: Number, default: 3 },
    rewards: { type: Number, default: 0 },
    maxUsers: { type: Number, default: 5 },
    freeUsers: { type: Number, default: 5 },
    goalsPerUser: { type: Number, default: 5 },
    stripeProductId: { type: String, default: null },
    pricing: {
        base: {
            month: { type: Object },
            year: { type: Object },
        },
        additional: {
            month: { type: Object },
            year: { type: Object },
        },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    stripe: { type: Boolean, default: true },
});

module.exports = mongoose.model('subscriptionPlan', subscriptionPlanSchema);
