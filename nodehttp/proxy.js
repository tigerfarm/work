// -----------------------------------------------------------------------------
// https://github.com/nodejitsu/node-http-proxy#using-https
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://www.google.com' });
}).listen(3000);
