const mongoose = require('mongoose');

function isValidTimestamp(date) {
    return new Date(date).getTime() > 0;
}

function convertSecsToMs(timestamp) {
    if (timestamp instanceof Date) {
        return timestamp;
    }

    if (!timestamp || !isValidTimestamp(timestamp)) {
        return undefined;
    }

    return new Date(timestamp * 1000);
}

const subscriptionSchema = new mongoose.Schema({
    price: { type: Number, default: 0 },
    paymentType: { type: String, default: '' },
    charge_id: { type: String, default: '' },
    type: { type: String, default: 'monthly' },
    chargedNumberOfUsers: { type: Number, default: 0 },
    totalNumberOfUsers: { type: Number, default: 0 },
    cancelAtPeriodEnd: { type: Boolean, default: false },
    cancelAtTime: { type: Date, set: (timestamp) => convertSecsToMs(timestamp) },
    canceledAtTime: { type: Date, set: (timestamp) => convertSecsToMs(timestamp) },
    isActive: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'subscriptionPlan' },
    stripeSubscriptionId: { type: String },
    stripeCustomerId: { type: String },
    periodStart: { type: Date, set: (timestamp) => convertSecsToMs(timestamp) },
    periodEnd: { type: Date, set: (timestamp) => convertSecsToMs(timestamp) },
    trialStartAt: { type: Date, set: (timestamp) => convertSecsToMs(timestamp) },
    trialEndAt: { type: Date, set: (timestamp) => convertSecsToMs(timestamp) },
    status: { type: String },
    createdAt: { type: Date, requires: true, default: Date.now },
});

module.exports = mongoose.model('subscription', subscriptionSchema);
