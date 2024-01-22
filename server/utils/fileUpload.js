// const multer = require('multer');
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);
// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '/home/nat/Code/SpaceBook/server/public/assets');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Create the multer instance
// const upload = multer({ storage: storage });


import * as path from 'path';
// import { Request, Response } from 'express';
import multer from 'multer';
import { URL } from 'url';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

const uploadFilePath = path.resolve(__dirname, '../..', 'public/uploads');

const storageFile = multer.diskStorage({
  destination: uploadFilePath,
  filename: (req, file, fn ) => {
    fn(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storageFile,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension= ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType= ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
    
    if (extension && mimeType) {
      return callback(null, true);
    }
    
    callback(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
  },
});

export default upload;
