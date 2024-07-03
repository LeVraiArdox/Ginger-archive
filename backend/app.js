const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

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
  const files = fs.readdirSync('./uploads');
  res.json(files);
});

// Endpoint to delete a file
app.delete('/delete/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    // Delete file
    fs.unlinkSync(filePath);
    res.json({ message: `Deleted file: ${filename}` });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
