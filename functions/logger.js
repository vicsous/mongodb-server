const { Error } = require('../db/models');

const logger = {
	error: async (err) => {
		const timestamp = Math.floor(new Date().getTime() / 1000);
		const errObj = { message: err.message, stack: err.stack, timestamp: timestamp };
		await Error.create(errObj);
		console.error('Error: ' + err.message + ' --- ' + new Date(timestamp * 1000));
	},
	warn: (warning) => {
		console.warn('Warning: ' + warning);
	},
	info: (information) => {
		console.info('Info: ' + information);
	} 
}

module.exports = logger