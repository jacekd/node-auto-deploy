/**
 * serverSpec
 * @author: Jacek Dominiak
 * @copyright: Jacek Dominiak
 * @created: 25/01/15
 */

var expect = require('chai').expect;

var request = require('request');

var server = require('../server'),
    config = require('../config');

describe('server based tests', function() {

    it('should be true', function (done) {
        expect(true).to.equal(true);
        done();
    });

    it('should be able to reach the server', function (done) {

        var data = {};

        var options = {
            uri: 'http://' + config.app.HOST + ':' + config.app.PORT,
            method: 'GET',
            json: data
        };

        request(options, function (err, res, body) {
            if (err) throw err;
            expect(res.statusCode).to.equal(404);
            expect(body).to.equal('Not Found');
            done();
        });
    });

    it('should be able to make deploy request', function (done) {
        var data = {
            "ref": "develop",
            "build_status": "success"
        };

        var options = {
            uri: 'http://' + config.app.HOST + ':' + config.app.PORT + '/deploy?script=test.sh',
            method: 'POST',
            json: data
        };

        request(options, function (err, res, body) {
            if (err) throw err;
            expect(res.statusCode).to.equal(200);
            expect(body).to.equal('Accepted');
            done();
        });
    });

    it('should fail if no script if specified', function (done) {
        var data = {
            "ref": "develop",
            "build_status": "success"
        };

        var options = {
            uri: 'http://' + config.app.HOST + ':' + config.app.PORT + '/deploy',
            method: 'POST',
            json: data
        };

        request(options, function (err, res, body) {
            if (err) throw err;
            expect(res.statusCode).to.equal(200);
            expect(body).to.equal('No Script Data');
            done();
        });

    });

    it('should receive 404 when request is other than POST /deploy', function (done) {
        var data = {};

        var options = {
            uri: 'http://' + config.app.HOST + ':' + config.app.PORT,
            method: 'GET',
            json: data
        };

        request(options, function (err, res, body) {
            if (err) throw err;
            expect(res.statusCode).to.equal(404);
            expect(body).to.equal('Not Found');
            done();
        });
    });
});