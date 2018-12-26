const fs = require('fs');
const http = require('http');

const reqListener = function(req, res) {
  const url = req.url,
        method = req.method;

  res.setHeader('Content-Type', 'text/html');

  if (url === "/") {
    res.write("<h1>Hello from Node.js server</h1>");
    res.write("<p>You reached: " + url + " path.</p>");
  } else if (url === '/message' && method === 'GET') {
    res.write("<p>POST method has been sended</p>");
  } else if (url === "/message" && method === "POST") {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();

      const postedMessage = parsedBody.split('=')[1];

      fs.writeFile('message.txt', postedMessage, err => {
        if (err) {
          console.log(err);
        }

        res.statusCode = 302;
        res.setHeader('Location', '/message');
        return res.end();
      });
    });
  } else {
    res.write("<form action='/message' method='POST'><input type='text' name='name'><button type='submit'>POST</button></form>");
  }
}

http.createServer(reqListener).listen(3000);