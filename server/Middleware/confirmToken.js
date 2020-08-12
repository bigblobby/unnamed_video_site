const userHelper = require('../Helpers/user.helper');

const confirmToken = async(req, res, next) =>{
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const [ prefix, token ] = req.headers.authorization.split(' ');

    if(token) {
        try {
            req.tokenData = await userHelper.verifyToken(token);
            next();
        } catch(e) {
            res.status(401).json({ message: 'Invalid token or token expired', authenticated: false });
        }
    } else {
        res.status(401).json({ message: 'No token provided', authenticated: false });
    }
}

module.exports = confirmToken
