const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema({
    accessToken: { type: String, requires: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, requires: true, default: Date.now },
});

module.exports = mongoose.model('accessToken', accessTokenSchema);
