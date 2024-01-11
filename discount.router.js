const mongoose = require("mongoose");
const router = require("express").Router()
const discountController = require("../controller/discountcontroller");


router.post("/createDiscount", discountController.createDiscount);
router.post("/discount", discountController.discount)

module.exports = router