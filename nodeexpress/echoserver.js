var http = require('http');
http.createServer(function (request, response) {
    console.log('+ Headers: ' + JSON.stringify(request.headers));
    console.log('+ URL: ' + request.method + ' ' + request.url);
    if (request.method === 'GET') {
        var query = require('url').parse(request.url, true).query;
        console.log('+ GET query :' + JSON.stringify(query));
    }
    var data = "";
    if (request.method === 'POST') {
        request.on('data', function (chunk) {
            console.log('+ Received data :' + chunk.toString() + ':');
            data += chunk.toString();
        });
        request.on('end', function () {
            console.log('+ Complete data :' + data + ':');
        });
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("Cheers");
    response.end();

}).listen(8000);