import sha1 from 'crypto-js/sha1';

import config from '../config';

const Path = require('path');
const fs = require('fs');

export class UploadAnyFiles {
  route: any;
  count: number = 0;

  deleteFolderRecursive = (folder: string, slug?: string) => {
    let path = `${folder}`;
    if (this.count++ === 0) {
      path = `${config.STATIC_UPLOADS}/${folder}`;
    }
    if (typeof slug !== 'undefined') {
      path += `/${slug}`;
    }
    // fs.rmdirSync(path, {recursive: true});
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file: any) => {
        const curPath = Path.join(path, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          this.deleteFolderRecursive(curPath, slug);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };

  uploadFiles = (files: any, folder: string, slug?: string) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    if (!slug) {
      // eslint-disable-next-line no-param-reassign
      slug = sha1(uniqueSuffix).toString();
    }
    let count = 0;
    if (!files) {
      throw new Error('Not Files');
    }
    Object.keys(files).forEach((file: any) => {
      const tempFile = files[file];
      const ext = Path.extname(tempFile.name);
      tempFile.mv(
        `${config.STATIC_UPLOADS}/${folder}/${slug}/${count++}${ext}`
      );
    });
  };

  constructor(route = 'users') {
    this.route = route;
  }
}
