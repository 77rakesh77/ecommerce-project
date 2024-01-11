const mongoose = require("mongoose");
const Product = require("../model/product");





exports.searchProducts = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        const regexQuery = new RegExp(searchTerm, 'i');

        const searchResults = await Product.find({
            $or: [
                { productName: { $regex: regexQuery } },
                { category: { $regex: regexQuery } }
            ]
        });
        res.status(200).json({
            success: true,
            message: "Search successful",
            data: searchResults
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
