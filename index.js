const searchBlacklist = require('./lib/search-blacklist');

module.exports = isReffererSpammer;

function isReffererSpammer(referrer, callback){

	if (!callback) return searchBlacklist(referrer);

	searchBlacklist(referrer)
		.then(result => callback(null, result))
		.catch(callback);

}