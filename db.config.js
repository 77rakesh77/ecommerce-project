const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
    .then((res, err) => {
        console.log("connection successfully....");
    }).catch((err) => {
        throw err
    })