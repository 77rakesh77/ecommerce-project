const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    name: {
        type: String

    },
    adminName: {
        type: String

    },
    productName: {
        type: String

    },
    price: {
        type: Number

    },
    category: {
        type: String

    },
    email: {
        type: String,
        unique: true

    },
    mobile: {
        type: String

    },
    password: {
        type: String

    },
    isdelete: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("admin", adminSchema);