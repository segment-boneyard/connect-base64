var assert = require('assert');
var request = require('supertest');
var express = require('express');
var base64 = require('../');


describe('connect-base64', function () {
  it('should add a base64 encoded string to the body', function (done) {
    var body = 'ƒåke-data!';
    var app = express()
      .use(base64())
      .all('/', function (req, res) {
        assert(req.body === body);
        res.end();
      });

    request(app)
      .get('/')
      .query({ data: new Buffer(body).toString('base64') })
      .expect(200, done);
  });

  it('should allow for a custom querystring key', function (done) {
    var body = 'ƒåke-data!';
    var app = express()
      .use(base64('x'))
      .all('/', function (req, res) {
        assert(req.body === body);
        res.end();
      });

    request(app)
      .get('/')
      .query({ x: new Buffer(body).toString('base64') })
      .expect(200, done);
  });

  it('should not touch non-GET requests', function (done) {
    var body = 'test';
    var app = express()
      .use(base64())
      .all('/', function (req, res) {
        assert(!req.body);
        res.end();
      });

    request(app)
      .post('/')
      .query({ data: new Buffer(body).toString('base64') })
      .expect(200, done);
  });

  it('should not fail on invalid base64 encoding', function (done) {
    var app = express()
      .use(base64())
      .all('/', function (req, res) {
        assert(req.body);
        res.end();
      });

    request(app)
      .get('/')
      .query({ data: 'ƒåke-data!' })
      .expect(200, done);
  });

  it('should ignore requests without a querystring', function (done) {
    var app = express()
      .use(base64())
      .all('/', function (req, res) {
        assert(!req.body);
        res.end();
      });

    request(app)
      .get('/')
      .expect(200, done);
  });
});