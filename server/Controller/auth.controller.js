const protect = async (req, res) => {
    const {User} = await require('../Model');

    try {
        const user = await User.findOne({id: req.tokenData.id});

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
    protect: protect
}
