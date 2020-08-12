const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');

function createToken(user){
    return jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: Number(process.env.JWT_EXPIRE)})
}

function verifyToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        })
    });
}

module.exports = {
    createToken: createToken,
    verifyToken: verifyToken,
}
