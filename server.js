const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
const app = express();
 
app.use('/', createProxyMiddleware({ target: 'http://itch.io', changeOrigin: true }));
app.listen(3000);