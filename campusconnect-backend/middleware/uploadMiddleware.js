import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);  // Create the directory if it doesn't exist
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Define where the files should be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);  // Get file extension
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');  // Sanitize file name (optional for safety)
    cb(null, `${Date.now()}-${sanitized}`);  // Generate a unique file name based on timestamp
  },
});

// Initialize multer with storage config
const upload = multer({ storage });

export default upload;
