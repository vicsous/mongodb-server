const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    const authHeader = req.headers['cookie'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split('=')[1];
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
    } catch (e) {
        return res.status(403).send('Please login');
    }
    next();
}

module.exports = verifyToken