const mongoose = require("mongoose");
const router = require("express").Router();
const controller = require("../controller/usercontroller");
const {registerUserSchemaInput,validateLoginInput} = require("../middleware/joi.validation")


router.post("/register",registerUserSchemaInput,controller.registerUser);
router.post("/login",validateLoginInput,controller.signIn);



module.exports = router