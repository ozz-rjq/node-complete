const http = require('http');

const reqListener = function(req, res) {
  console.log(req);
  res.end('you have been connected to the server!');
}

http.createServer(reqListener).listen(3000);