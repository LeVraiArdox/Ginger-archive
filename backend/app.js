const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Setup storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'uploads')));

// Endpoint to upload files
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file.filename });
});

// Endpoint to list uploaded files
app.get('/files', (req, res) => {
  const fs = require('fs');
  const files = fs.readdirSync('./uploads');
  res.json(files);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
