const mongoose = require("mongoose");
const router = require("express").Router();
const offerController = require("../controller/offercontroller");

router.post("/createOffer", offerController.createOffer)
router.post("/applyOffer", offerController.applyOffer)
router.post("/buy3pay2", offerController.buy3pay2Offer)


module.exports = router 