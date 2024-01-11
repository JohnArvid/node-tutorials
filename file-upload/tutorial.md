### Step 1: Set Up Your Project

Create a new Node.js project and initialize it with npm:

```bash
npm init -y
```

Install necessary dependencies:

```bash
npm install express multer
```

### Step 2: Create the Server

Create a file named `server.js` and set up a basic Express server:

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer
const upload = multer({ storage: storage });

// Serve HTML form for file upload
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### Step 3: Create the HTML Form

Create a file named `index.html` to serve as the front end:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Upload</title>
</head>
<body>
  <h1>File Upload</h1>
  <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" required>
    <button type="submit">Upload</button>
  </form>
</body>
</html>
```

### Step 4: Run Your Application

Run your application using the following command:

```bash
node server.js
```

Visit `http://localhost:3000` in your web browser, and you should see the file upload form.

### Conclusion

This tutorial provides a simple example of a file upload service using Node.js, Express, and `multer`. You can customize the code according to your specific requirements. Additionally, consider adding security measures, such as input validation and authentication, before deploying this service in a production environment.