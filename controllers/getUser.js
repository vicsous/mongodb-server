const { User } = require('../db/models');

const getUser = async (req, res) => {
    const user = await User.findOne({ username: req.params.username.toUpperCase() });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
}

module.exports = getUser