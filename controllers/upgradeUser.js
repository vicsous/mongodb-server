const updateFile =  require('../functions/updateFile');
const { User } = require('../db/models');

const upgradeUser = async (req, res) => {
    const user = await User.find({ username: req.params.username.toUpperCase() });
    if (!user[0]) return res.status(200).json({ message: 'User not found' });
    req.body.upgrade ? roles = [ process.env.USER_CODE, process.env.MOD_CODE ] : roles = [ process.env.USER_CODE ]; 
    const { status, data } = await updateFile(req.params.username.toUpperCase(), { roles }, User);
    return res.status(status).json(data);
}

module.exports = upgradeUser;