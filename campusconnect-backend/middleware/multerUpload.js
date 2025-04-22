import multer from "multer";

// Set up storage engine for Multer
const storage = multer.diskStorage({
  // Generate a unique filename for each uploaded file
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);  // Pass the unique name to the callback
  },

  // Define the destination folder for file uploads (optional)
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure that this folder exists or create it dynamically
  }
});

// Create the Multer instance with the storage configuration
const upload = multer({ storage });

export default upload;
