const http = require('http');

const reqListener = require('./routes');

http.createServer(reqListener).listen(3000);