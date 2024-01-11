const mongoose = require("mongoose");
const ecommSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userName:{
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String,
    },
    mobile:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("user", ecommSchema)