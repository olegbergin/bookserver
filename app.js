const http = require('http'); // Import Node.js core module
const fs = require('fs'); // Import file system module
const path = require('path'); // Import path module

// Define the directory containing HTML templates
const dirPath = path.join(__dirname, '/templates');

// Create the HTTP server
const server = http.createServer((req, res) => {
  let filePath;

  // Route logic to serve different pages
  if (req.url === '/') {
    filePath = path.join(dirPath, 'page.html'); // Serve home page
  } else if (req.url === '/about') {
    filePath = path.join(dirPath, 'about.html'); // Serve about page
  } else if (req.url === '/contact') {
    filePath = path.join(dirPath, 'contact.html'); // Serve contact page
  } else if (req.url === '/styles/styles.css') {
    filePath = path.join(dirPath, '/styles/styles.css'); // Serve CSS file
  } else {
    // Handle 404 - Page Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  // Read and serve the requested file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Handle internal server errors
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      // Determine content type based on file extension
      const ext = path.extname(filePath);
      const contentType =
        ext === '.html' ? 'text/html' :
          ext === '.css' ? 'text/css' : 'text/plain';

      // Serve the file with the correct content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Node.js web server at port 3000 is running...');
});
