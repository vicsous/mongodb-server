const express = require('express');
const router = express.Router();
const getAuth = require('../controllers/getAuth');
const verifyToken = require('../middlewares/verifyToken');

router.route('/')
    .post(verifyToken, getAuth)

module.exports = router;