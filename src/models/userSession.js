const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const UserSessionSchema = new Schema({
    userID: { type: Number, default: -1 },
    timestamp: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);

