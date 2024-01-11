const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    address: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("order", orderSchema)