const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer().listen(8000);;

http.createServer(function(req, res) {
  proxy.web(req, res, { target: 'https://www.google.com/' });
});