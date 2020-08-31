const getUserChannel = async (req, res) => {
    const { username } = req.body;
    const { User } = await require('../Model');

    try {
        const user = await User.findOne({ username: username });

        res.status(200).json({user: user});
    } catch(e) {
        res.status(500).json({error: 'There was a problem getting the user'});
    }
}

module.exports = {
    getUserChannel: getUserChannel
}
