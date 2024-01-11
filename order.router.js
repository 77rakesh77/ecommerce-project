const mongoose = require("mongoose");
const router = require("express").Router();
const orderController = require("../controller/ordercontroller");



router.post("/orderCreate", orderController.createOrder)
router.get("/populateOrder", orderController.populateOrder)
router.post("/completeOrder", orderController.completeOrder)
router.post("/pendingOrder", orderController.markOrderAsPending)
router.put("/cancelOrder", orderController.cancelOrder)
router.put("/updateOrder", orderController.updateOrder)


module.exports = router