const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getLogin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toUpperCase()});
    if (!user) return res.status(200).json({ message: 'User not found' });
    const auth = await bcrypt.compare(req.body.password, user.password);
    if(!auth) return res.status(200).json({ message: 'Wrong password' });
    const token = await jwt.sign({ _id: user.id, roles: user.roles }, process.env.TOKEN_SECRET, { expiresIn: '365d' });
    return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 }).json({ message: `User '${user.username}' logged in`, data: { username: user.username, email: user.email, id: user._id }});
}

module.exports = getLogin