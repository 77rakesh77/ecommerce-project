const mongoose = require("mongoose");

const sallerSchema = new mongoose.Schema({

    sallerCode: {
        type: String
    },
    sallerName: {
        type: String

    },
    sallerEmail: {
        type: String
    },
    productName: {
        type: String

    },
    category: {
        type: String

    },
    address: {
        type: String

    },
    mobile: {
        type: String

    },
    price: {
        type: Number

    },
    isdelete: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("saller", sallerSchema)