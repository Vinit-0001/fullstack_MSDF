const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Process files endpoint
app.post('/process', upload.fields([
  { name: 'pcd', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'calibration', maxCount: 1 },
  { name: 'labels', maxCount: 1 }
]), async (req, res) => {
  try {
    // Here you would implement your actual processing logic
    // For now, we'll return a mock response
    const mockResponse = {
      detections: [
        {
          bbox: [100, 200, 300, 400],
          confidence: 0.95,
          class: 1
        },
        {
          bbox: [400, 500, 600, 700],
          confidence: 0.87,
          class: 2
        }
      ],
      projected_points: [
        {
          point: [1.23, 2.45, 3.67],
          size: 1.5
        },
        {
          point: [2.34, 3.56, 4.78],
          size: 2.0
        }
      ],
      status: 'success'
    };

    // Clean up uploaded files after processing
    Object.values(req.files).forEach(files => {
      files.forEach(file => {
        fs.unlinkSync(file.path);
      });
    });

    res.json(mockResponse);
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 