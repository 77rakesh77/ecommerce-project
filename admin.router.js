const mongoose = require("mongoose")
const router = require("express").Router();
const adminController = require("../controller/admincontroller");
const { registerAdminImput, adminLoginInput } = require("../middleware/joi.validation")
const { adminVerifyToken } = require("../middleware/auth");



router.post("/adminRegister", registerAdminImput, adminController.adminRegister);
router.post("/adminLogin", adminLoginInput, adminController.adminLogin)
router.post("/adminChangePassword", adminVerifyToken, adminController.adminChangePassword)
router.post("/adminReactive", adminVerifyToken, adminController.adminReactiveUser)

router.delete("/adminDelete", adminVerifyToken, adminController.adminDelete)
router.put("/adminUpdate", adminVerifyToken, adminController.adminUpdate)
router.get("/findAdmin", adminVerifyToken, adminController.findAdmin)
router.get("/adminAllFind", adminController.findAllAdmin)




module.exports = router