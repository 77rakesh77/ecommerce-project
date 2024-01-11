const mongoose = require("mongoose");
const Offer = require("../model/offer");
const Product = require("../model/product")


exports.createOffer = async (req, res) => {
    try {
        const { name, description, eligibleProductIds, discountAmount } = req.body;

        // Validate request parameters
        if (!name || !description || !eligibleProductIds || eligibleProductIds.length === 0 || !discountAmount) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request parameters'
            });
        }

        // Check if the offer with the same name already exists
        const existingOffer = await Offer.findOne({ name });

        if (existingOffer) {
            return res.status(400).json({
                success: false,
                message: 'Offer with the same name already exists'
            });
        }

        // Create a new offer
        const newOffer = new Offer({
            name,
            description,
            eligibleProductIds,
            discountAmount
        });

        // Save the new offer to the database
        const savedOffer = await newOffer.save();

        res.status(201).json({
            success: true,
            message: 'Offer created and saved successfully',
            data: savedOffer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

exports.applyOffer = async (req, res) => {
    try {
        const { productId } = req.body;

        // Validate request parameters
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request parameters'
            });
        }

        // Find the product by ID
        const product = await Product.findById(productId);
        // Check if the product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Find the applicable "Buy 1, Get 1 Free" offer
        const bogoOffer = await Offer.findOne({
            name: 'Buy 1 Get 1 Free',
            eligibleProductIds: { $in: [productId] }
        });
        // Check if the offer exists
        if (!bogoOffer) {
            return res.status(404).json({
                success: false,
                message: 'Buy 1, Get 1 Free offer not available for the selected product'
            });
        }

        // Apply the offer by doubling the quantity of the selected product
        product.quantity += bogoOffer.discountAmount;

        // Save the updated product to the database
        await product.save();

        res.status(200).json({
            success: true,
            message: 'Buy 1, Get 1 Free offer applied successfully',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

exports.buy3pay2Offer = async (req, res) => {
    try {
        const { productIds } = req.body;

        // Find the applicable "Buy 3, Pay for 2 Sitewide" offer
        const buy3pay2Offer = await Offer.findOne({
            name: 'Buy 3 Pay for 2 Sitewide',
            eligibleProductIds: { $all: productIds }
        });

        // Check if the offer exists
        if (!buy3pay2Offer) {
            return res.status(404).json({
                success: false,
                message: 'Buy 3 Pay for 2 Sitewide offer not available for the selected products'
            });
        }

        // Find the products by IDs
        const products = await Product.find({ _id: { $in: productIds } });

        // Check if all selected products exist
        if (products.length !== productIds.length) {
            return res.status(404).json({
                success: false,
                message: 'One or more products not found'
            });
        }

        // Apply the offer by reducing the price of one product
        const discountProduct = products[0]; // Assume the first product in the array will be discounted
        discountProduct.price = 0; // Set the price to 0 to make it free

        // Save the updated product to the database
        await discountProduct.save();
        
        const totalAmount = products.reduce((total, product) => total + product.price, 0);

        res.status(200).json({
            success: true,
            message: 'Buy 3 Pay for 2 Sitewide offer applied successfully',
            data: {
                products,
                totalAmount
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}
