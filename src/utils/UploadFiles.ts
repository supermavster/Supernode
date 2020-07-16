import sha1 from 'crypto-js/sha1';

import config from '../config';

export class UploadAnyFiles {
  route: any;

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
      // path.extname(tempFile.name);
      const ext = '.jpg';
      tempFile.mv(
        `${config.STATIC_UPLOADS}/${folder}/${slug}/${count++}${ext}`
      );
    });
  };

  constructor(route = 'users') {
    this.route = route;
  }
}
