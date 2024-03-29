function verifyRoles (role) {
    return (req, res, next) =>  {
        if (!req.user.roles.includes(role)) {
            return res.json({ message: 'Invalid role' });
        }
        next();
    }
}

module.exports = verifyRoles