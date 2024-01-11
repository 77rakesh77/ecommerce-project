const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: Number
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("cart", cartSchema)