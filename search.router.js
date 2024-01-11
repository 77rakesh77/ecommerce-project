const mongoose = require("mongoose");
const router = require("express").Router()
const searchController = require("../controller/searchcontroller");



router.get("/searchProducts",searchController.searchProducts)




module.exports = router