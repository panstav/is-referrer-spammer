const expect = require('expect.js');

const isReferrerSpam = require('../');

const NOT_SPAMING = 'google.com';
const IS_SPAMING = 'free-traffic.xyz';

describe('Module', () => {

	describe('Callback', () => {

		it('Should return false for a non spam domain', () => {

			isReferrerSpam(NOT_SPAMING, (err, result) => {
				expect(err).to.be.equal(null);
				expect(result).to.be.equal(false);
			});

		});

		it('Should return true for a spam domain', () => {

			isReferrerSpam(IS_SPAMING, (err, result) => {
				expect(err).to.be.equal(null);
				expect(result).to.be.equal(true);
			});

		});

	});

	describe('Promise', () => {

		it('Should return false for a non spam domain', () => {

			return isReferrerSpam(NOT_SPAMING).then(result => {
				expect(result).to.be.equal(false);
			}).catch(err => { expect(err).to.be.equal(undefined); });

		});

		it('Should return true for a spam domain', () => {

			return isReferrerSpam(IS_SPAMING).then(result => {
				expect(result).to.be.equal(true);
			}).catch(err => { expect(err).to.be.equal(undefined); });

		});

	});

});