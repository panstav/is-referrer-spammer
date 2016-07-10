const express = require('express');
const request = require('supertest');

const isReferrerSpam = require('../');

const common = require('./common');

var server;

beforeEach(() => {
	server = express();
});

describe('Middleware', () => {

	it('Should be able to mark a spammer', done => {

		server.get('/',
			isReferrerSpam.middleware(spamHandler),
			(req, res) => { res.status(req.isSpammer ? 200 : 400).end(); }
		);

		return request(server)
			.get('/')
			.set('referer', common.IS_SPAMING)
			.expect(200, done);

		function spamHandler(result, req, res, next){
			req.isSpammer = true;
			next();
		}

	});

	it('Should be able to block a spammer', done => {

		server.get('/',
			isReferrerSpam.middleware(spamHandler),
			() => { done(new Error('Wasn\'t blocked - got to final middleware')) }
		);

		return request(server)
			.get('/')
			.set('referer', common.IS_SPAMING)
			.expect(404, done);

		function spamHandler(result, req, res, next){
			res.status(404).end();
		}

	});

});