import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/images');
  },
  filename: (req, file, cb) => {
    let ext = file.mimetype.split('/')[1];
    let fileName = new mongoose.Types.ObjectId() + '.' + ext;
    cb(null, fileName);
    // cb(null, req.body.userId + '_post' + Date.now() + '.' + ext);
  }
})

const upload = multer({
  limits: {
    fileSize: 4 * 1024**2
  },
  storage: storage
});

export default upload;