const mongoose = require("mongoose");
const admin = require("../model/admin");
const bcrypt = require("bcrypt")
const { adminJwtToken } = require("../utils/jwt");



exports.adminRegister = async (req, res) => {
    try {
        let { email, password } = req.body
        let userData = await admin.findOne({ email })
        if (userData) {
            res.status(400).json({
                success: true,
                message: "email already exits!"
            })

        } else {
            let hash = await bcrypt.hash(password, 10)
            let adminData = new admin({
                userName: req.body.userName,
                name: req.body.name,
                adminName: req.body.adminName,
                productName: req.body.productName,
                price: req.body.price,
                category: req.body.category,
                email: req.body.email,
                password: hash,
                mobile: req.body.mobile,
            })
            let result = await adminData.save()
            res.status(200).json({
                succuss: true,
                message: "user register succussfully",
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

exports.adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let adminUserData = await admin.findOne({ email });
        if (adminUserData) {
            let passwordMatch = await bcrypt.compare(password, adminUserData.password);
            let token = await adminJwtToken(adminUserData._id)
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
            });
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    };
};

exports.adminReactiveUser = async (req, res) => {
    try {
        let adminUser = await admin.findOne({ _id: req.user });
        if (!adminUser) {
            return res.status(400).json({
                success: false,
                message: "admin user not found!"
            });
        } else {
            if (adminUser.isdelete = true) {
                await adminUser.save();
                return res.status(200).json({
                    succuss: true,
                    message: "Admin reactivated user"
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "User to reactivate not found!"
                });
            };
        };
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


exports.adminChangePassword = async (req, res) => {
    try {
        let { newPassword } = req.body
        const adminUser = await admin.findOne({ _id: req.user })
        if (!adminUser) {
            return res.status(400).json({
                succuss: false,
                message: "admin not found!"
            });
        }
        let hashNewPassword = await bcrypt.hash(newPassword, 10)
        adminUser.password = hashNewPassword
        await adminUser.save()
        return res.status(200).json({
            succuss: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

exports.adminDelete = async (req, res) => {
    try {
        let user = await admin.findOne({ _id: req.user });
        if (!user) {
            return res.status(404).json({
                succuss: true,
                message: 'User not found'
            });
        }
        if (user.isdelete) {
            return res.status(400).json({
                succuss: false,
                message: 'User is already marked as deleted'
            });
        }
        user.isdelete = true;
        await user.save();
        return res.status(200).json({
            succuss: true,
            message: 'User marked as deleted successfully'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

exports.adminUpdate = async (req, res) => {
    try {

        let adminUser = await admin.findOne({ _id: req.user });
        if (!adminUser) {
            return res.status(404).json({
                succuss: true,
                message: 'User not found'
            });
        }
        await admin.findByIdAndUpdate(adminUser, req.body, { new: true });
        await adminUser.save()
        return res.status(200).json({
            succuss: true,
            message: "Admin User Updated Succussfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

exports.findAdmin = async (req, res) => {
    try {
        let adminUser = await admin.findById({ _id: req.user })
        if (!adminUser) {
            return res.status(400).json({
                succuss: false,
                message: "admin user not found!"
            });
        } else {
            res.status(200).json({
                succuss: true,
                message: "admin user find succussfully",
                data: adminUser
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
};

exports.findAllAdmin = async(req,res) => {
    try {
        let user = await admin.find()
        if(!user){
            return res.status(400).json({
                succuss: false,
                message: "admin user not found!"
            });
        }else{
            res.status(200).json({
                succuss: true,
                message: "admin user find all succussfully",
                data: user
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

