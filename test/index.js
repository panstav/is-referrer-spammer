const expect = require('expect.js');

const isReferrerSpam = require('../');

const NOT_SPAMING = 'google.com';
const IS_SPAMING = 'free-traffic.xyz';

describe('isReferrerSpammer', () => {

	describe('Callback', () => {

		it('Should return false for a non spam domain', () => {

			isReferrerSpam(NOT_SPAMING, (err, result) => {
				expect(err).to.be.equal(null);
				expect(result).to.be.equal(false);
			});

		});

		it('Should return false for an undefined argument', () => {

			isReferrerSpam(undefined, (err, result) => {
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
			});

		});

		it('Should return false for an undefined argument', () => {

			return isReferrerSpam(undefined).then(result => {
				expect(result).to.be.equal(false);
			});

		});

		it('Should return true for a spam domain', () => {

			return isReferrerSpam(IS_SPAMING).then(result => {
				expect(result).to.be.equal(true);
			});

		});

	});

	describe('Subdomain and Hosts', () => {

		it('Should recognize spam domains with a subdomain', () => {

			return isReferrerSpam(`sub.${IS_SPAMING}`).then(result => {
				expect(result).to.be.equal(true);
			}).then(() => {

				return isReferrerSpam(`sub.${NOT_SPAMING}`);
			}).then(result => {
				expect(result).to.be.equal(false);
			});

		});

		it('Should recognize spam domains with a subdomain AND a host', () => {

			return isReferrerSpam(`host.sub.${IS_SPAMING}`).then(result => {
				expect(result).to.be.equal(true);
			}).then(() => {

				return isReferrerSpam(`host.sub.${NOT_SPAMING}`);
			}).then(result => {
				expect(result).to.be.equal(false);
			});

		});

	});

});