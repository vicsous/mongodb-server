const express = require('express');
const router = express.Router();
const getLogin = require('../controllers/getLogin');

router.route('/')
    .post(getLogin)

module.exports = router;