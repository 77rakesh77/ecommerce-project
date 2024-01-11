const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productCode: {
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
    quantity: {
        type: Number
    },
    productImage: [
        {
            file: String

        }
    ],
    freeQuantity: {
        type: Number,
        default: 0
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

module.exports = mongoose.model("product", productSchema)