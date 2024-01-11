const mongoose = require("mongoose")
const router = require("express").Router();
const productController = require("../controller/productcontroller");
const { adminVerifyToken, verifyToken } = require("../middleware/auth");
const upload = require("../middleware/upload");



router.post("/addProduct", verifyToken, upload, productController.addProduct);
router.put("/updateProduct/:id", adminVerifyToken, productController.updateProduct)
router.delete("/deleteProduct/:id", adminVerifyToken, productController.deleteProduct)
router.delete("/deleteImage/:id/:imageId", upload, productController.productImageUpdateAndDelete)
router.get("/findProfuct/:id",verifyToken,productController.findProduct);
router.get("/findAllProduct",verifyToken,productController.findAllProducts)


module.exports = router