// Import the 'http' module
const http = require('http');
const fs = require('fs');
const path = require('path');

let jsonResponse = JSON.stringify({
  header: 'Hello, out there!',
  paragraph: 'This is a paragraph',
});
let htmlStringResponse = `<html><head></head><body><h1>Hello world!</h1></body></html>`;

// Define the path to the HTML file
const filePath = path.join(__dirname, 'index.html');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Read the HTML file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'plain text' });
      res.end('Internal server error');
      return;
    }
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // Send the response
    res.end(data);
  });
});

// Set the server to listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
