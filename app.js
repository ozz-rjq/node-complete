const http = require('http');

const reqListener = function(req, res) {
  const url = req.url,
        method = req.method;

  res.setHeader('Content-Type', 'text/html');

  res.write("<html>");
  res.write("<head><title>Render HTML</title></head>");
  res.write("<body>");
  res.write("<h1>Hello from Node.js server</h1>");

  if (url === "/") {
    res.write("<p>You reached: " + url + " path.</p>");
  } else if (url === "/message" && method === "POST") {
    res.write("<p>POST method has been sended</p>");
  } else {
    res.write("<form action='/message' method='POST'><input type='text' name='name'><button type='submit'>POST</button></form>");
  }

  res.write("</body>");
  res.write("</html>");

  res.end();
}

http.createServer(reqListener).listen(3000);