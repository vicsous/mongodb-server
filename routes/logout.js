const express = require('express');
const router = express.Router();
const logout = require('../controllers/logout');

router.route('/')
    .post(logout)

module.exports = router;