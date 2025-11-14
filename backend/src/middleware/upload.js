const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create subdirectories
['resumes', 'tasks', 'avatars', 'documents', 'logos'].forEach(dir => {
  const fullPath = path.join(uploadDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'documents';
    
    if (file.fieldname === 'resume') folder = 'resumes';
    else if (file.fieldname === 'avatar') folder = 'avatars';
    else if (file.fieldname === 'logo') folder = 'logos';
    else if (file.fieldname === 'taskFiles') folder = 'tasks';
    
    cb(null, path.join(uploadDir, folder));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = {
    resume: ['.pdf', '.doc', '.docx'],
    avatar: ['.jpg', '.jpeg', '.png', '.gif'],
    logo: ['.jpg', '.jpeg', '.png', '.svg'],
    taskFiles: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.zip', '.rar'],
    document: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.zip', '.rar']
  };

  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = allowedTypes[file.fieldname] || allowedTypes.document;

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Only ${allowedExtensions.join(', ')} files are allowed for ${file.fieldname}`), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next();
};

module.exports = { upload, handleMulterError };
