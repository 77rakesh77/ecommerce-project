const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true
    },
    percentage: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model("discount", discountSchema)