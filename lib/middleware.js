const searchBlacklist = require('./search-blacklist');

module.exports = middleware;

function middleware(handleFn){

	return (req, res, next) => {

		searchBlacklist(req.headers.referer)
			.then(handleOrContinue)
			.catch(next);

		function handleOrContinue(result){
			if (result === false) return next();

			handleFn(result, req, res, next);
		}

	};

}