const http = require('http');

const express = require('express');
const app = express();

// const reqListener = require('./routes');

http.createServer(app).listen(3000);