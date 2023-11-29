// Import the 'http' module
const http = require('http');
const h1text = 'Hello, out there!';
const para = '<p>This is a paragraph</p>';


// Create an HTTP server
const server = http.createServer((req, res) => {
	// Set the response header
	res.writeHead(200, {'Content-Type': 'text/html'});

	// Send the response
	res.end(`
		<html>
			<body>
				<h1>${h1text}</h1>
				${para}
			</body>
		</html>\n`);

});

// Set the server to listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}/`)
});
