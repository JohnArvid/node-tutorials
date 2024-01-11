Building a real-time chat application with Node.js using the `socket.io` library involves setting up a server to handle WebSocket connections and managing communication between clients. Below is a step-by-step tutorial:

### Step 1: Set Up Your Project

Create a new directory for your project and initialize a Node.js project using npm:

```bash
mkdir real-time-chat
cd real-time-chat
npm init -y
```

Install the required dependencies:

```bash
npm install express socket.io
```

### Step 2: Create Your Server

Create a file named `server.js` and set up your Node.js server using Express and `socket.io`:

```javascript
// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

### Step 3: Create Your HTML File

Create an HTML file named `index.html` in your project directory:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Real-time Chat</title>
</head>
<body>
  <ul id="messages"></ul>
  <form id="form" action="">
    <input id="m" autocomplete="off" /><button>Send</button>
  </form>
  <script src="/socket.io/socket.io.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  <script src="/client.js"></script>
</body>
</html>
```

### Step 4: Create Your Client-Side JavaScript

Create a file named `client.js` for your client-side JavaScript:

```javascript
// client.js
const socket = io();

$('form').submit(function(e){
  e.preventDefault();
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
```

### Step 5: Connect Clients with Socket.io

Update your `server.js` to handle socket connections and broadcast messages:

```javascript
// server.js (updated)
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
```

### Step 6: Run Your Application

Run your server:

```bash
node server.js
```

Visit http://localhost:3000 in your browser. You can open multiple tabs to simulate different users. They should be able to send and receive real-time messages.

This tutorial provides a basic setup for a real-time chat application. Depending on your needs, you might want to add user authentication, rooms, or additional features. Socket.io offers a robust framework for building real-time applications, so feel free to explore its documentation for more advanced features.