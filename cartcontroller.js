const mongoose = require("mongoose");
const cart = require("../model/cart");



// exports.addToCart = async (req, res) => {
//     try {
//         const { productId, quantity } = req.body;
//         let userId = req.user
//         let cartData = await cart.findOne({ userId });
//         if (cartData) {
//             let existingProduct = cartData.products.find(p => p.productId === productId);
//             if (existingProduct) {
//                 let cartProdut = await cart.updateOne({ userId, "products.productId": productId }, { $inc: { "products.$.quantity": quantity } });
//                 return res.status(201).json({
//                     succuss: true,
//                     message: "cart update succusfully",
//                     data: cartProdut
//                 });
//             } else {
//                 let cartPush = await cart.updateOne({ userId }, { $push: { products: { productId, quantity } } })
//                 return res.status(201).json({
//                     succuss: true,
//                     message: "cart push succusfully",
//                     data: cartPush
//                 });
//             }
//         } else {
//             const newCart = await cart.create({
//                 userId,
//                 products: [{ productId, quantity }]
//             });
//             return res.status(201).json({
//                 succuss: true,
//                 message: "cart add succusfully",
//                 data: newCart
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             succuss: false,
//             message: "server error"
//         })
//     }
// }

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let userId = req.user
        let cartData = await cart.findOne({ userId });
        if (cartData) {
            let cartProduct = await cart.updateOne(
                { userId, "products.productId": productId },
                {
                    $inc: {
                        "products.$.quantity": quantity
                    }
                }
            );
            if (cartProduct.modifiedCount === 0) {
                // If the product doesn't exist, push a new product
                cartProduct = await cart.updateOne(
                    { userId },
                    {
                        $push: {
                            products: {
                                productId: productId,
                                quantity: quantity
                            }
                        }
                    }
                )
            };
            return res.status(201).json({
                succuss: true,
                message: "Cart updated successfully",
                data: cartProduct
            });
        } else {
            const newCart = await cart.create({
                userId,
                products: [{ productId, quantity }]
            });
            return res.status(201).json({
                succuss: true,
                message: "Cart added successfully",
                data: newCart
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

exports.populateCart = async (req, res) => {
    try {
        let { _id } = req.body
        const data = await cart.findOne({ _id }).populate({ path: "products.productId", select: 'productCode' });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Cart populate succussfully",
            Data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succuss: false,
            message: "server error"
        })
    }
}

exports.totalAmount = async (req, res) => {
    try {
        let { _id } = req.body;
        const data = await cart.findOne({ _id }).populate({ path: "products.productId" });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        const totalAmount = data.products.reduce((sum, product) => {
            return sum + (product.quantity * product.productId.price);
        }, 0);
        
        res.status(200).json({
            success: true,
            message: "TotalAmount details successfully",
            data: {
                totalAmount,
                products: data.products
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

exports.removeCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user;

        let cartData = await cart.findOne({ userId });
        if (cartData) {
            await cart.updateOne(
                { userId },
                { $pull: { products: { productId } } }
            );
            return res.status(200).json({
                success: true,
                message: "Product removed from cart successfully"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
