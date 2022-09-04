const express = require('express');
const router = express.Router();
const updateUser = require('../controllers/updateUser');

router.route('/:username')
    .put(updateUser)

module.exports = router;