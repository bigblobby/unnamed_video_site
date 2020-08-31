const authHelper = require('../Helpers/auth.helper');

const userRegister = async (req, res) => {
    const { username, password, email } = req.body;
    const { User } = await require('../Model');

    if(!username && !password) return res.status(500).json({ error: 'You must pick a username and password' });
    if(!username) return res.status(500).json({ error: 'You must pick a username' });
    if(!password) return res.status(500).json({ error: 'You must pick a password' });

    User.create({
        username,
        email,
        password
    }).then(async (result) => {
        if(result[0]){
            const user = await User.findOne({username});
            const token = await authHelper.createToken(user);

            res.status(200).json({ user: user, token: token, message: 'success' });
        } else {
            res.status(500).json({error: 'Something appears to have gone wrong'});
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
        const token = await authHelper.createToken(user);

        res.status(200).json({user: user, token: token, message: 'success'})
    } catch(e) {
        console.log(e);
        const errorMessage = 'Your username or password is incorrect';
        return res.status(500).json({ error: errorMessage });
    }
};

const protect = async (req, res) => {
    const {User} = await require('../Model');

    try {
        const user = await User.findOne({id: req.tokenData.id});

        console.log(user);

        if(user) {
            res.status(200).json({ user: user, authenticated: true });
        } else {
            res.status(404).json({ message: 'No user found', authenticated: false });
        }
    } catch(e) {
        res.status(500).json({error: 'Something appears to have gone wrong', authenticated: false});
    }
}

module.exports = {
    userLogin: userLogin,
    userRegister: userRegister,
    protect: protect
}
