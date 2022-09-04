const User = require('../db/models');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    req.body.username = req.body.username.toUpperCase();
    req.body.email = req.body.email.toUpperCase();
	const user = await User.findOne({ username: req.body.username });
	if (user) return res.status(422).send('Username already in use');
	const email = await User.findOne({ email: req.body.email });
	if (email) return res.status(422).send('Email address already in use');
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.roles = [ process.env.USER_CODE ];
    if (req.body.mod || req.user?.roles.includes(process.env.ADMIN_CODE)) req.body.roles.push(process.env.MOD_CODE);
	req.body.createdAt = Math.floor(new Date().getTime() / 1000);
	req.body.modifiedAt = req.body.createdAt;
    await User.create(req.body);
    return res.status(200).send(`User '${req.body.username}' created`);
}

module.exports = createUser