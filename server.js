// Import the 'http' module
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
	// Set the response header
	res.writeHead(200, {'Content-Type': 'text/plain'});

	// Send the response
	res.end('Hello, World!\n');

});

// Set the server to listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}/`)
});