const logger =  require('../functions/logger');

module.exports = function (err, req, res, next) {
	logger.error(err)
	res.status(500).send(err.message);
}