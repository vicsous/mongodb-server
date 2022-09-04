function verifyRoles (role) {
    return (req, res, next) =>  {
        if (!req.user.roles.includes(role)) {
            return res.sendStatus(401);
        }
        next();
    }
}

module.exports = verifyRoles