// -----------------------------------------------------------------------------
console.log("+++ Start.");
var port = process.argv[2] || 8000;

var http = require('http');
var url = require("url");
//
var path = require("path");
var fs = require("fs");
//
http.createServer(function (request, response) {
    //
    // {"host":"localhost:8000","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:66.0) Gecko/20100101 Firefox/66.0","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","accept-language":"...
    // console.log('+ Headers: ' + JSON.stringify(request.headers));
    console.log("+ HTTP headers:");
    var theHeaders = JSON.stringify(request.headers).split('","');
    for (var i = 0; i < theHeaders.length; i++) {
        if (i === 0) {
            console.log('++ ' + theHeaders[i].substring(1, theHeaders[i].length) + '"');
        } else if (i === theHeaders.length - 1) {
            console.log('++ "' + theHeaders[i].substring(0, theHeaders[i].length-1) + '');
        } else {
            console.log('++ "' + theHeaders[i].substring(0, theHeaders[i].length) + '"');
        }
    }
    console.log("---");
    //
    let theMethod = request.method;
    var uri = url.parse(request.url).pathname;
    console.log("+ " + theMethod + " URI: " + uri + " + request.url: " + request.url);
    //
    if (theMethod === 'GET') {
        var query = JSON.stringify( require('url').parse(request.url, true).query );
        if (query !== "{}") {
            console.log('+ GET query: ' + query);
        }
    }
    var data = "";
    if (theMethod === 'POST') {
        request.on('data', function (chunk) {
            console.log('+ Received data :' + chunk.toString() + ':');
            data += chunk.toString();
        });
        request.on('end', function () {
            console.log('+ Complete (on "end") data :' + data + ':');
        });
    }
    console.log("---");
    //
    // -------------------------------------------------------------------------
    // Handle static files
    var filename = path.join(process.cwd(), "docroot/" + uri);
    console.log('+ filename: ' + filename);
    fs.exists(filename, function (exists) {
        // ---------------------------------------------------------------------
        // Handle static files
        if (!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }
        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }
        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }
            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
        console.log("------------------------------------------");
    });

}).listen(port);
console.log("+ Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");