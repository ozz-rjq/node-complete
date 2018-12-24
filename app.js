const http = require('http');

const reqListener = function(req, res) {
  console.log(req.url, req.method);

  res.setHeader('Content-Type', 'text/html');

  res.write("<html>");
  res.write("<head><title>Render HTML</title></head>");
  res.write("<body>");
  res.write("<h1>Welcome to the Server</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
}

http.createServer(reqListener).listen(3000);