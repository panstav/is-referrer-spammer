const expect = require('expect.js');

const isReferrerSpam = require('../');

describe('Module', () => {

	it('Should return false for a non spam domain', () => {

		return isReferrerSpam('google.com').then(result => {
			expect(result).to.be.equal(false);
		}).catch(err => { expect(err).to.be.equal(undefined); });

	});

	it('Should return true for a spam domain', () => {

		return isReferrerSpam('free-traffic.xyz').then(result => {
			expect(result).to.be.equal(true);
		}).catch(err => { expect(err).to.be.equal(undefined); });

	});

});