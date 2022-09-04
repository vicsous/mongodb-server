const express = require('express');
const router = express.Router();
const searchFiles = require('../controllers/searchFiles');
const verifyToken = require('../middlewares/verifyToken');
const verifyRoles = require('../middlewares/verifyRoles');

router.route('/',)
    .get(verifyToken, verifyRoles(process.env.USER_CODE), searchFiles);

module.exports = router;