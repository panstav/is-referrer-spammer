const fs = require('fs');
const byline = require('byline');
const parseDomain = require('domain-name-parser');

const PATH_TO_SPAMMERS_LIST = 'node_modules/@piwik/referrer-spam-blacklist/spammers.txt';

module.exports = searchBlacklist;

function searchBlacklist(referrer){

	if (referrer === undefined) return Promise.resolve(false);

	return new Promise((resolve, reject) => {

		const stream = byline(fs.createReadStream(PATH_TO_SPAMMERS_LIST, { encoding: 'utf8' }));

		var isSpammer = false;

		stream.on('error', err => reject(err));

		stream.on('data', line => {
			if (compare(line, referrer)) resolve(true);
		});

		stream.on('end', () => {
			if (!isSpammer) resolve(false);
		});

	});

}

function compare(item, subject){

	const parsedItem = parseDomain(subject);

	return item === subject
		|| item === parsedItem.domainName
		|| item === parsedItem.domain;
}