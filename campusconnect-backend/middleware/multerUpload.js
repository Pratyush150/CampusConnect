import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure upload directory
const uploadDir = path.join(__dirname, "../uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// File validation configuration
const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
const maxSize = 10 * 1024 * 1024; // 10MB

// Sanitize filename function
const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-zA-Z0-9-_.]/g, "_");
};

// Configure storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const sanitized = sanitizeFilename(file.originalname);
    const uniqueName = `${Date.now()}-${sanitized}`;
    cb(null, uniqueName);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}`), false);
  }
};

// Configure multer middleware
const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter,
});

// Error handling middleware wrapper
export const fileUploadHandler = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        let message = "File upload failed";
        if (err.code === "LIMIT_FILE_SIZE") {
          message = `File too large. Maximum size: ${maxSize/1024/1024}MB`;
        } else if (err.message.includes("Invalid file type")) {
          message = err.message;
        }
        return res.status(400).json({ success: false, message });
      }
      next();
    });
  };
};
