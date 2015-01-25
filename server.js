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
    qs = require('querystring');

http.createServer(function (req, res) {
    if (req.method === "POST" && req.url === "/deploy") {

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
            var data = JSON.parse(requestBody);

            if (!!data.test) {
                console.log(data);
            }

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Accepted');
        });
    } else {
        res.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }

}).listen(config.app.PORT, config.app.HOST);
console.log('Started service on port: ', config.app.PORT);
