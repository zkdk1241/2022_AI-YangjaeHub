const { Schema } = require("mongoose");
const shortId = require("./types/short-id");

module.exports = new Schema({
    shortId,
    email: String,
    password: String,
    name: String
}, {
    timestamps: true
});