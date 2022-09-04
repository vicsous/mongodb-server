const cookie = require('cookie');

const logout = async (req, res) => {
        return res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', '', {
                httpOnly: true,
                maxAge: new Date(0),
                path: '/'
            })
        ).status(200).send('User logged out');
}

module.exports = logout