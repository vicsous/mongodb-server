const express = require('express');
const router = express.Router();
const getUser = require('../controllers/getUser');

router.route('/:username',)
    .get(getUser)

module.exports = router;