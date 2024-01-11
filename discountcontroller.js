const mongoose = require("mongoose");
const Discount = require("../model/discount");
const generateRandomCode = require("../utils/common");


exports.createDiscount = async (req, res) => {
    try {
        let { percentage } = req.body;

        let discountData = new Discount({
            code: generateRandomCode(),
            percentage,

        })
        let result = await discountData.save()
        res.status(200).json({
            succuss: true,
            message: "discountData add succussfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succuss: false,
            message: "Internal Server Error"
        })
    }
}


// exports.discount = async (req, res) => {
//     try {
//         const { code, totalAmount } = req.body;

//         const discount = await Discount.findOne({ code });

//         if (!discount) {
//             return res.status(400).json({
//                 succuss: false,
//                 message: "Discount not found"
//             });
//         }
//         const discountedAmount = totalAmount - (totalAmount * (discount.percentage / 100));
//         res.status(200).json({
//             succuss: true,
//             message: "discountedAmount succussfully",
//             data: discountedAmount
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             succuss: false,
//             message: "Internal Server Error"
//         })
//     }
// }

exports.discount = async (req, res) => {
    try {
        const { code, totalAmount } = req.body;

        const discount = await Discount.findOne({ code });

        if (!discount) {
            return res.status(400).json({
                success: false,
                message: "Discount not found"
            });
        }

        let discountedAmount = totalAmount;

        if (totalAmount > 799) {
            discountedAmount = totalAmount - (totalAmount * (discount.percentage / 100));
            res.status(200).json({
                success: true,
                message: "Discount applied successfully",
                data: {
                    originalAmount: totalAmount,
                    discountedAmount
                }
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Discount not applied",

            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
