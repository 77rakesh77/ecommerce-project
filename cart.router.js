const mongoose = require("mongoose");
const router = require("express").Router();
const cartController = require("../controller/cartcontroller");
const { userVerifyToken } = require("../middleware/auth");

router.post("/addToCart", userVerifyToken, cartController.addToCart)
router.post("/populateCart", cartController.populateCart)
router.post("/remove", userVerifyToken, cartController.removeCart)
router.post("/totalAmount", cartController.totalAmount)

module.exports = router