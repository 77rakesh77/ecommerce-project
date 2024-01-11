const mongoose = require("mongoose");
const saller = require("../model/saller");
require('dotenv').config()
const fs = require("fs")
const ejs = require("ejs")
const sgMail = require('@sendgrid/mail');
const { sallerJwtToken } = require("../utils/jwt");
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const ejsTemplate = fs.readFileSync('./templates/otp_template.ejs', 'utf-8');


const sendOTPEmail = async (recipientEmail, otp, sallerName) => {

    const emailBody = ejs.render(ejsTemplate, { otp, sallerName });

    const msg = {
        to: recipientEmail,
        from: '57rakesh17@gmail.com',
        subject: 'Your OTP for Verification',
        text: `Your OTP  is:${otp}`,
        html: emailBody
    }
    sgMail.send(msg)
        .then(() => {
            console.log('Email sent successfully');
        })
        .catch((error) => {
            console.error(error);
        });


};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.createSaller = async (req, res) => {
    try {
        const generatedOTP = generateOTP();
        let { sallerCode, sallerName, sallerEmail, productName, category, address, mobile, price } = req.body
        let userData = await saller.findOne({ sallerEmail });

        if (userData) {
            res.status(400).json({
                success: false,
                message: "user not found!"
            })
        } else {
            let sallerCode = Math.floor(Math.random().toFixed(4) * 9999);
            let data = new saller({
                sallerCode,
                sallerName,
                sallerEmail,
                productName,
                category,
                address,
                mobile,
                price,
                otp: generatedOTP
            });
            await sendOTPEmail(req.body.sallerEmail, generatedOTP, data.sallerName);
            let result = await data.save();
            res.status(200).json({
                succuss: true,
                message: "saller register succussfull",
                data: result
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

exports.sallerLogin = async (req, res) => {
    try {
        let { sallerCode, sallerName, sallerEmail } = req.body;
        let sallerLogin = await saller.findOne({
            $or: [
                { sallerCode },
                { sallerName },
                { sallerEmail },
            ],
        });
        if (!sallerLogin) {
            return res.status(400).json({
                success: false,
                message: "saller is not found!"
            });
        } else {
            let token = await sallerJwtToken(sallerLogin._id)
            if (saller.isdelete = true) {
                res.status(200).json({
                    success: true,
                    message: "saller login",
                    data: token
                })
            } else {
                res.status(400).json({
                    succuss: false,
                    message: "saller is not active"
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        let { sallerEmail, otp } = req.body
        let userData = await saller.findOne({
            $or: [
                { _id: req.user },
                { sallerEmail },
            ],
        });
        if (!userData) {
            return res.status(400).json({
                succuss: false,
                message: "saller not found!"
            })
        }
        if (otp !== userData.otp) {
            res.status(400).json({
                succuss: false,
                message: "Invalid otp"
            })
        } else {
            res.status(200).json({ succuss: true, message: "otp verify succussfully" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
};

exports.resendOtp = async (req, res) => {
    try {
        let { sallerEmail } = req.body;

        if (!sallerEmail) {
            return res.status(400).json({
                succuss: false,
                message: 'Email is required'
            });
        }
        let otp = generateOTP()
        await sendOTPEmail(sallerEmail, otp);
        await saller.findOneAndUpdate({ sallerEmail }, { otp: otp });
        res.status(200).json({
            success: true,
            message: "otp resend succussfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

exports.sallerFind = async (req, res) => {
    try {
        let sallerUser = await saller.findOne({ _id: req.user });
        if (sallerUser) {
            res.status(200).json({
                success: true,
                message: "Saller User Find SuccussFully",
                data: sallerUser
            })
        } else {
            res.status(400).json({
                succuss: false,
                message: "saller user not found!"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}