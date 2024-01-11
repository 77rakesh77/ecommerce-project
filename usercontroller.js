const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../utils/jwt");



exports.registerUser = async (req, res) => {
    try {
        let { email, password } = req.body
        let userData = await User.findOne({ email })
        if (userData) {
            res.status(400).json({
                success: true,
                message: "email already exits!"
            })

        } else {
            let hash = await bcrypt.hash(password, 10)
            let data = new User({
                name: req.body.name,
                userName: req.body.userName,
                email: req.body.email,
                password: hash,
                mobile: req.body.mobile,
                gender: req.body.gender
            })
            let result = await data.save()
            res.status(200).json({
                succuss: true,
                message: "user register succussfull",
                data: result
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


exports.signIn = async (req, res) => {
    try {
        let { email, password } = req.body;
        let userData = await User.findOne({ email });
        if (userData) {
            let passwordMatch = await bcrypt.compare(password, userData.password);
            let token = await generateJwtToken(userData._id)
            if (passwordMatch) {
                res.status(200).json({
                    succuss: true,
                    message: "user details",
                    data: token
                })
            } else {
                res.status(400).json({
                    succuss: false,
                    message: "password is incerrect!"
                })
            }
        } else {
            res.status(400).json({
                succuss: false,
                message: "email is incerrect!"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}