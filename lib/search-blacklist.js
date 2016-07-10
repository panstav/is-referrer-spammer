const fs = require('fs');
const byline = require('byline');

const PATH_TO_SPAMMERS_LIST = 'node_modules/@piwik/referrer-spam-blacklist/spammers.txt';

module.exports = searchBlacklist;

function searchBlacklist(referrer){

	return new Promise((resolve, reject) => {

		const stream = byline(fs.createReadStream(PATH_TO_SPAMMERS_LIST, { encoding: 'utf8' }));

		var isSpammer = false;

		stream.on('error', err => reject(err));

		stream.on('data', line =>{

			if (line === referrer) {
				isSpammer = true;
				resolve(isSpammer);
			}

		});

		stream.on('end', () =>{
			if (!isSpammer) resolve(false);
		});

	});

}