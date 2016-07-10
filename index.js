const searchBlacklist = require('./lib/search-blacklist');
const middleware = require('./lib/middleware');

module.exports = isReffererSpammer;
module.exports.middleware = middleware;

function isReffererSpammer(referrer, callback){

	if (!callback) return searchBlacklist(referrer);

	searchBlacklist(referrer)
		.then(result => callback(null, result))
		.catch(callback);

}