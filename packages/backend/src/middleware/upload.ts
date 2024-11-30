import multer from 'multer';
import path from 'path';
import sanitize from 'sanitize-filename';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../../uploads');
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Get file extension
    const ext = path.extname(file.originalname);
    // Get filename without extension and sanitize it
    const nameWithoutExt = path.basename(file.originalname, ext);
    const sanitizedName = sanitize(nameWithoutExt).replace(/\s+/g, '-');
    // Create final filename with timestamp
    const finalName = `${Date.now()}-${sanitizedName}${ext}`;
    cb(null, finalName);
  },
});

const upload = multer({ storage });

export default upload;
