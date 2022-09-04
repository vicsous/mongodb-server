const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAuth = async (req, res) => {
	throw new Error('Deu ruim');
    const user = await User.findOne({ email: req.body.email.toUpperCase()});
    if (!user) return res.status(404).send('User not found');
    const auth = await bcrypt.compare(req.body.password, user.password);
    if(!auth) return res.status(422).send('Wrong password');
    const token = await jwt.sign({ _id: user.id, roles: user.roles }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).send(`User '${user.username}' logged in`);
}

module.exports = getAuth