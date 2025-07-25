import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Build absolute path to /uploads
const uploadPath = path.join(__dirname, '..', 'uploads');

// Make sure it exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

export default upload;
