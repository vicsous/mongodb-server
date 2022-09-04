const { User } = require('../db/models');

const getUser = async (req, res) => {
    const user = await User.findOne({ username: req.params.username.toUpperCase() });
    if (!user) return res.sendStatus(404);
    return res.status(200).json(user);
}

module.exports = getUser