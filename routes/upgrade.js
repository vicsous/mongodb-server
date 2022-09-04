const express = require('express');
const router = express.Router();
const verifyRoles = require('../middlewares/verifyRoles');
const verifyToken = require('../middlewares/verifyToken');
const upgradeUser = require('../controllers/upgradeUser');

router.route('/:username',)
    .get(verifyToken, verifyRoles(process.env.ADMIN_CODE), upgradeUser)

module.exports = router;