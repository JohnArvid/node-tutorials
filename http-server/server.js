// Import the 'http' module
import { createServer } from 'http';

// Create an HTTP server
const server = createServer((req, res) => {
	// Set the response header
	res.writeHead(200, {'Content-Type': 'text/html'});

	// Send the response
	res.end(JSON.stringify({
		header: 'Hello, out there!',
		paragraph: 'This is a paragraph'	
	}));

});

// Set the server to listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}/`)
});
