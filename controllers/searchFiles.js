const { User } = require('../db/models');

const getUsers = async (req, res) => {
    const users = await User.find(req.body);
    if (users) return res.status(200).json(users);
}

module.exports = getUsers