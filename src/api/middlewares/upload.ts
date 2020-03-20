import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/images');
  },
  filename: (req, file, cb) => {
    console.log(req.body, file);
    let ext = file.mimetype.split('/')[1];
    cb(null, req.body.userId + '_post' + Date.now() + '.' + ext);
  }
})

const upload = multer({
  limits: {
    fileSize: 4 * 1024**2
  },
  storage: storage
});

export default upload;