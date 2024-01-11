const mongoose = require("mongoose");
const router = require("express").Router();
const sallerController = require("../controller/sallercontroller");
const { sallerRagisterInput, sallerLoginInput } = require("../middleware/joi.validation");
const { sallerVerifyToken } = require("../middleware/auth")


router.post("/sallerRegister", sallerRagisterInput, sallerController.createSaller);
router.post("/sallerLogin", sallerLoginInput, sallerController.sallerLogin)
router.post("/verify", sallerVerifyToken, sallerController.verifyOtp)
router.post("/resendOtp", sallerController.resendOtp)
router.get("/sallerFind", sallerVerifyToken, sallerController.sallerFind)


module.exports = router