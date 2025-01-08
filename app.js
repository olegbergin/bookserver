const http = require('http'); // Import Node.js core module
const fs = require('fs'); // Import file module
const path = require('path');

const dirPath = path.join(__dirname, '/templates');

// Creating server
const server = http.createServer((req, res) => {
  const filePath = `${dirPath}/page.html`;

  // Read the HTML file asynchronously
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Node.js web server at port 3000 is running...');
});