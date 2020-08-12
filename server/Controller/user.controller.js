const userHelper = require('../Helpers/user.helper');

const userSignup = async (req, res) => {
    const { username, password, email } = req.body;
    const { User } = await require('../Model');

    User.create({
        username,
        email,
        password
    }).then(async (result) => {
        if(result[0]){
            const user = await User.findOne({username});
            const token = await userHelper.createToken(user);


            res.status(200).json({ user: user, token: token, message: 'success' });
        }
    }).catch(err => {
        if(err.code === 'ER_DUP_ENTRY'){
            const errorMessage = 'Sorry this username has already been taken';
            return res.status(500).json({ error: errorMessage });
        }
    });
}

const userLogin = async (req, res) => {
    const { username, password } = req.body;
    const { User } = await require('../Model');

    try {
        const user = await User.verify(username, password);
        const token = await userHelper.createToken(user);

        res.status(200).json({user: user, token: token, message: 'success'})
    } catch(e) {
        const errorMessage = 'Your username or password is incorrect';
        return res.status(500).json({ error: errorMessage });
    }
};

const protect = async (req, res) => {
    const {User} = await require('../Model');
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const [ prefix, token ] = req.headers.authorization.split(' ');

    if(token) {
        try {
            const tokenData = await userHelper.verifyToken(token);
            const user = await User.findOne({id: tokenData.id});

            if(user) {
                res.status(200).json({ user: user, authenticated: true });
            } else {
                res.status(404).json({ message: 'No user found', authenticated: false });
            }
        } catch(e) {
            res.status(401).json({ message: 'Token expired', authenticated: false });
        }
    } else {
        res.status(401).json({ message: 'No token provided', authenticated: false });
    }
}

module.exports = {
    userSignup: userSignup,
    userLogin: userLogin,
    protect: protect
}
