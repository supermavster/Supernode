import path from 'path';

import {Request} from 'express';
import sha1 from 'crypto-js/sha1';

import config from '../../config';

const multer = require('multer');

const imageFilter = (request: Request, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const storage = multer.diskStorage({
  destination: (request: Request, file: any, cb: any) => {
    cb(null, `${config.STATIC_UPLOADS}/route`);
  },
  filename: (request: Request, file: any, cb: any) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const name = sha1(uniqueSuffix).toString();
    const ext = path.extname(file.originalname);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

export const uploadMiddleware = multer({
  storage,
  fileFilter: imageFilter
});
