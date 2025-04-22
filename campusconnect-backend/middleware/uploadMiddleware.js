import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_'); // optional safety
    cb(null, `${Date.now()}-${sanitized}`);
  },
});

// Initialize multer with storage config
const upload = multer({ storage });

export default upload;
