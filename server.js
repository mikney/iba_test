const http = require("http");
const fs = require('fs').promises;
const path = require('path')
//const hmtl = require("index.html")

const host = 'localhost';
const port = 8080;

const requestListener = function (req, res) {

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
  }
  let filePath = req.url;
  if (filePath === '/' || filePath === '/favicon.ico') {
    filePath = '/index.html';
  }
  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = mimeTypes[extname]
  try {
    fs.readFile(__dirname + filePath).then(contents => {
      // res.writeHead(200);
      res.setHeader("Content-Type", contentType);
      res.end(contents);
    })
  } catch (e) {
    console.log(e)
  }

}
const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
