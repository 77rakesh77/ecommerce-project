const jwt = require("jsonwebtoken");
const { USER_SECRECT_KEY, ADMIN_SECRECT_KEY, SALLER_SECRECT_KEY } = process.env


const optional = {
    expiresIn: "24h"
}

async function generateJwtToken({ _id }) {
    try {
        const payload = { _id };
        const token = jwt.sign(payload, USER_SECRECT_KEY, optional);
        return { token: token };

    } catch (error) {
        return { error: true }
    }
}

async function adminJwtToken({ _id }) {
    try {
        const payload = { _id };
        const token = jwt.sign(payload, ADMIN_SECRECT_KEY, optional);
        return { token: token };

    } catch (error) {
        return { error: true }
    }
}

async function sallerJwtToken({ _id }) {
    try {
        const payload = { _id };
        const token = jwt.sign(payload, SALLER_SECRECT_KEY, optional);
        return { token: token };

    } catch (error) {
        return { error: true }
    }
}


module.exports = { generateJwtToken, adminJwtToken, sallerJwtToken }