const { User } = require('../db/models');

const getAuth = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ username: user.username, email: user.email, id: user._id });
}

module.exports = getAuth