/**
 * Main server file
 * @author: Jacek Dominiak
 * @copyright: Jacek Dominiak
 * @created: 25/01/15
 */
// Import config
var config = require('./config');

// Application imports
var http = require('http'),
    qs = require('querystring'),
    url = require('url'),
    exec = require('child_process').execFile;

http.createServer(function (req, res) {

    // deconstruct url
    var urlData = url.parse(req.url, true);

    if (req.method === "POST" && urlData.pathname === "/deploy") {

        // initialize
        var requestBody = '';

        // collect data
        req.on('data', function (data) {
            requestBody += data;
            if (requestBody.length > 1e7) {
                res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/plain'});
                res.end('Request Too Large');
            }
        });

        // Parse data and respond
        req.on('end', function () {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            var data = JSON.parse(requestBody);

            if (data[config.conditions.address.branch] == config.conditions.branch
                && data[config.conditions.address.status] == config.conditions.status) {

                // exec a shell script
                if (!!urlData.query['script']) {
                    exec(config.script.PATH + urlData.query['script'], function (err, stout, stderr) {
                        //res.pipe(err || stout || stderr);
                        res.end('Accepted');
                    });
                } else {
                    res.end('No Script Data');
                }
            }

        });
    } else {
        res.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }

}).listen(config.app.PORT, config.app.HOST);
console.log('Started service on port: ', config.app.PORT);
