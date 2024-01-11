const mongoose = require("mongoose");
const product = require("../model/product");
const fs = require("fs").promises


exports.addProduct = async (req, res) => {
    try {


        let { productCode, productName, price, quantity, category } = req.body

        const exitsProduct = await product.findOne({
            $or: [
                { productName },
                { price }
            ],
        });
        if (exitsProduct) {
            res.status(400).json({
                succuss: false,
                message: "Product Not Exits!"
            });
        } else {

            if (quantity > 5) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity cannot exceed 5"
                });
            }
            productCode = Math.floor(Math.random().toFixed(4) * 9999);

            let user = new product({
                productCode,
                productName,
                price,
                quantity,
                category,
                productImage: req.files.map(file => ({ file: file.filename }))
            });
            let result = await user.save();
            res.status(200).json({
                succuss: true,
                message: "product add succussfully",
                data: result
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succuss: false,
            message: "server error"
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let _id = req.params.id;
        let productData = await product.findById(_id);
        if (!productData) {
            return res.status(400).json({
                succuss: false,
                message: "product not found!"
            });
        };
        let result = await product.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(200).json({
            succuss: 200,
            message: "product updated succussfully",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succuss: false,
            message: "server error"
        });
    };
};

exports.deleteProduct = async (req, res) => {
    try {
        let _id = req.params.id;
        let user = await product.findById(_id);
        if (!user) {
            return res.status(400).json({
                succuss: false,
                message: "product not found!"
            });
        };
        if (product.isdelete = true) {
            await product.findOneAndDelete({ _id }, req.body);
            res.status(200).json({
                succuss: true,
                message: "product delete succussfully"
            });
        } else {
            res.status(400).json({
                succuss: false,
                message: "product not active"
            });
        };

    } catch (error) {
        console.log(error);
        res.status(500).json({
            succuss: false,
            message: "server error"
        });
    };
};


exports.productImageUpdateAndDelete = async (req, res) => {
    try {
        let _id = req.params.id
        const userData = await product.findOne({ _id });

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const imagePathToDelete = req.body.imagePathToDelete

        await fs.unlink(imagePathToDelete);

        const imageId = req.params.imageId;
        await product.findByIdAndUpdate(userData, { $pull: { productImage: { _id: imageId } } }, { new: true });

        const newImage = req.files.map(file => ({ file: file.filename }));
        await product.findByIdAndUpdate(userData, { $push: { productImage: newImage } }, { new: true });

        res.status(200).json({ success: true, message: "image update and delete succussfull" })
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error: ' + err.message,
        });
    }
};


exports.findProduct = async (req, res) => {
    try {
        let _id = req.params.id
        let productData = await product.findById(_id);
        if (!productData) {
            return res.status(400).json({
                succuss: false,
                message: "product not found!"
            });
        } else {
            res.status(200).json({
                succuss: true,
                message: "product find succussfully",
                data: productData
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succuss: false,
            message: "server error"
        });
    }
}

exports.findAllProducts = async (req, res) => {
    try {
        let productData = await product.find()
        if (!productData) {
            return res.status(400).json({
                succuss: false,
                message: "product not found!"
            });
        } else {
            res.status(200).json({
                succuss: true,
                message: "product find succussfully",
                data: productData
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succuss: false,
            message: "server error"
        });
    }
}

// exports.updateProductImage = async (req, res) => {
//     try {
//         let _id = req.params.id
//         const userData = await product.findOne({ _id });

//         if (!userData) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }
//         await product.findByIdAndUpdate(userData, { $push: { productImage: req.files.map(file => ({ file: file.filename })) } })
//         res.status(200).json({
//             succuss: true,
//             message: "image update succussfully"
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             succuss: false,
//             message: "server error"
//         });
//     }
// }

// const fs = require('fs/promises'); // Import the 'fs' module for file system operations

// exports.updateProductImage = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const productData = await product.findById(productId);

//         if (!productData) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Product not found'
//             });
//         }

//         // Delete old images from the server
//         for (const oldImage of productData.productImage) {
//             await fs.unlink(`public/upload/${oldImage.file}`);
//         }

//         // Update product images with new ones
//         const newImages = req.files.map(file => ({ file: file.filename }));
//         await product.findByIdAndUpdate(productId, { $set: { productImage: newImages } });

//         res.status(200).json({
//             success: true,
//             message: "Images updated successfully"
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };


