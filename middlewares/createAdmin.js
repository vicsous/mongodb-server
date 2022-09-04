const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const logger = require('../functions/logger');

async function createAdmin () {
    const admin = await User.findOne({ roles: process.env.ADMIN_CODE });
    if (admin) return logger.info('ADMIN registred');
    logger.info('Creating admin');
    const password = await bcrypt.hash('admin', 10);
	const dateNow = Math.floor(new Date().getTime() / 1000);
    const newAdmin = { 
		username: 'ADMIN',
		email: 'ADMIN@ADMIN',
		password: password,
		roles: [ process.env.ADMIN_CODE, process.env.MOD_CODE, process.env.USER_CODE ],
		modifiedAt: dateNow,
		createdAt: dateNow
	}
    await User.create(newAdmin);
	logger.warn('Please change ADMIN account password');
}

module.exports = { createAdmin }