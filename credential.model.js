const mongoose = require('mongoose');

var keywordSchema = new mongoose.Schema({
    key: String,
    value: String
});

const CredentialSchema = mongoose.Schema({
    name: String,
    username: String,
    website: String,
    email: String,
    password: String,
    keywords: [ keywordSchema ]
}, {
    timestamps: true
});
module.exports = mongoose.model('credential', CredentialSchema);
