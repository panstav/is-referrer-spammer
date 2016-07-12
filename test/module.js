const expect = require('expect.js');

const isReferrerSpam = require('../');

const common = require('./common');

describe('Module', () => {

	describe('Callback', () => {

		it('Should return false for a non spam domain', () => {

			isReferrerSpam(common.NOT_SPAMING, (err, result) => {
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

			isReferrerSpam(common.IS_SPAMING, (err, result) => {
				expect(err).to.be.equal(null);
				expect(result).to.be.equal(true);
			});

		});

	});

	describe('Promise', () => {

		it('Should return false for a non spam domain', () => {

			return isReferrerSpam(common.NOT_SPAMING).then(result => {
				expect(result).to.be.equal(false);
			});

		});

		it('Should return false for an undefined argument', () => {

			return isReferrerSpam(undefined).then(result => {
				expect(result).to.be.equal(false);
			});

		});

		it('Should return true for a spam domain', () => {

			return isReferrerSpam(common.IS_SPAMING).then(result => {
				expect(result).to.be.equal(true);
			});

		});

	});

	describe('Subdomain and Hosts', () => {

		it('Should recognize spam domains with a subdomain', () => {

			return isReferrerSpam(`sub.${common.IS_SPAMING}`).then(result => {
				expect(result).to.be.equal(true);
			}).then(() => {

				return isReferrerSpam(`sub.${common.NOT_SPAMING}`);
			}).then(result => {
				expect(result).to.be.equal(false);
			});

		});

		it('Should recognize spam domains with a subdomain AND a host', () => {

			return isReferrerSpam(`host.sub.${common.IS_SPAMING}`).then(result => {
				expect(result).to.be.equal(true);
			}).then(() => {

				return isReferrerSpam(`host.sub.${common.NOT_SPAMING}`);
			}).then(result => {
				expect(result).to.be.equal(false);
			});

		});

	});

});