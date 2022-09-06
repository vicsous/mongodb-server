const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    const authHeader = req.headers['cookie'];
    if (!authHeader) return res.json({ message: 'Invalid token' })
    const token = authHeader.split('=')[1];
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
    } catch (e) {
        return res.json({ message: 'Invalid token' })
    }
    next();
}

module.exports = verifyToken