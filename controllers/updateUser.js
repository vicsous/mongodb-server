const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const updateFile =  require('../functions/updateFile');

const updateUser = async (req, res) => {
    const user = await User.find({ username: req.params.username.toUpperCase() });
    if (!user[0]) return res.status(200).json({ message: 'User not found' });
    const decoded = await bcrypt.compare(req.body.password, user[0].password);
    if (!decoded) return res.status(200).json({ message: 'Wrong password' });
    if (req.body.username) {
        req.body.username = req.body.username.toUpperCase();
        const username = await User.find({ username: req.body.username.toUpperCase() });
        if (username[0]) return res.status(200).json({ message: 'Username already in use' });
    }
    if (req.body.email) {
        req.body.email = req.body.email.toUpperCase();
        const email = await User.find({ email: req.body.email.toUpperCase() });
        if (email[0]) return res.status(200).json({ message: 'Email already in use' });
    }
    req.body.newPassword ? req.body.password = await bcrypt.hash(req.body.newPassword, 10) : delete req.body.password;
    const { status, data } = await updateFile(req.params.username.toUpperCase(), req.body, User);
    return res.status(status).json(data);
}

module.exports = updateUser;