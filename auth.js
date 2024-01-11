const jwt = require("jsonwebtoken");
const { USER_SECRECT_KEY, ADMIN_SECRECT_KEY, SALLER_SECRECT_KEY } = process.env


const userVerifyToken = (req, res, next) => {
    const sallerToken = req.body.token || req.query.token || req.headers["token"];

    if (!sallerToken) {
        return res.status(400).json({ succuss: false, message: "token not authorized" })
    };
    try {
        const decode = jwt.verify(sallerToken, USER_SECRECT_KEY);
        req.user = decode._id
    } catch (error) {
        return res.status(400).json({ succuss: false, message: "invalid token" })
    };
    return next()
};


const adminVerifyToken = (req, res, next) => {
    const sallerToken = req.body.token || req.query.token || req.headers["token"];

    if (!sallerToken) {
        return res.status(400).json({ succuss: false, message: "token not authorized" })
    };
    try {
        const decode = jwt.verify(sallerToken, ADMIN_SECRECT_KEY);
        req.user = decode._id
    } catch (error) {
        return res.status(400).json({ succuss: false, message: "invalid token" })
    };
    return next()
};

const sallerVerifyToken = (req, res, next) => {
    const sallerToken = req.body.token || req.query.token || req.headers["token"];

    if (!sallerToken) {
        return res.status(400).json({ succuss: false, message: "token not authorized" })
    };
    try {
        const decode = jwt.verify(sallerToken, SALLER_SECRECT_KEY);
        req.user = decode._id;
    } catch (error) {
        return res.status(400).json({ succuss: false, message: "invalid token" })
    };
    return next()
};


const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["token"];

    if (!token) {
        return res.status(400).json({ success: false, message: "Token not provided" });
    }

    try {
        let decode = jwt.verify(token, ADMIN_SECRECT_KEY);
        req.user = decode._id;
    } catch (adminError) {
        try {
            decode = jwt.verify(token, SALLER_SECRECT_KEY);
            req.user = decode._id;
        }
        catch (sellerError) {
            return res.status(400).json({ success: false, message: "token invalid" });
        }
    }

    return next();
};



// const verifyToken = async (req, res, next) => {
//     try {
//         const token = req.body.token || req.query.token || req.headers["token"];
//         if (!token) {
//         return res.status(400).json({ success: false, message: "Token not provided" });
//     }
//         if (token) {
//             try {
//                 let  decode = jwt.verify(token, ADMIN_SECRECT_KEY);
//                 req.user = decode._id;
//                 return next();
//             } catch (adminError) {
//                 try {
//                     let sellerDecode = jwt.verify(token, SALLER_SECRECT_KEY);
//                     req.user = sellerDecode._id;
//                     return next();
//                 } catch (sellerError) {
//                     res.status(400).json({ success: false, message: "User Token is invalid" });
//                 };
//             };
//         } else {
//             res.status(400).json({ success: false, message: "Token not authorized" });
//         };
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     };
// };


module.exports = { userVerifyToken, adminVerifyToken, sallerVerifyToken, verifyToken }