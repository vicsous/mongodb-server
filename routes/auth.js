const express = require('express');
const router = express.Router();
const getAuth = require('../controllers/getAuth');

router.route('/')
    .post(getAuth)

module.exports = router;