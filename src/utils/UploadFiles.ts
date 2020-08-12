import sha1 from 'crypto-js/sha1';

import config from '../config';

const Path = require('path');
const fs = require('fs');

export class UploadAnyFiles {
  route: any;
  count: number = 0;
  filesExist: any;

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

  uploadFiles = (files: any, pathFolder: string) => {
    if (!files) {
      throw new Error('Not Files');
    }
    if (!pathFolder) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      // eslint-disable-next-line no-param-reassign
      pathFolder = sha1(uniqueSuffix).toString();
    }
    // Filter Data
    let keysFiles: any;
    let countValue: any;
    if (typeof this.filesExist === 'undefined') {
      keysFiles = Object.keys(files);
      countValue = this.getCountValues(keysFiles);
      this.filesExist = [keysFiles, countValue];
    } else {
      keysFiles = this.filesExist[0];
      countValue = this.filesExist[1];
    }
    // Upload File
    keysFiles.forEach((file: any) => {
      const tempFile = files[file];
      let name = file.replace(/\[[0-9]\]/g, '');
      const complement = name;
      if (Object.keys(countValue).includes(complement)) {
        name = `${name}_${countValue[complement]--}`;
      }
      const routeFile = `${pathFolder}/${name}`;
      this.uploadSingleFile(routeFile, tempFile);
    });
  };

  getFiles = (slug: string) => {
    const response = {
      all: [],
      main: '',
      orderByType: []
    };
    const path = `${config.STATIC_UPLOADS}/${slug}/`;
    if (!fs.existsSync(path)) {
      return response;
    }
    const files = fs
      .readdirSync(path)
      .map((element: string) => `/${slug}/${element}`)
      .filter((element: string) => element.split('.').pop());
    response.all = files;
    // List By Type
    const extensions = files.map((element: any) => {
      return element.split('.').pop();
    });
    const unique = [...new Set(extensions)];
    const typeFiles = extensions.map((element: any) =>
      this.checkTypeFile(element)
    );
    let newFiles: any = [];
    typeFiles.forEach((element: any) => {
      newFiles.push([element, []]);
    });
    newFiles = Object.fromEntries(new Map(newFiles));
    files.forEach((elementExt: any) => {
      unique.forEach((element) => {
        const extension = elementExt.split('.').pop();
        if (extension === element) {
          const typeFile = this.checkTypeFile(`${element}`);
          newFiles[typeFile].push(elementExt);
        }
      });
    });
    response.orderByType = newFiles;

    const mainImage = files.filter(
      (element: any) => element.indexOf('main') > 0
    );
    response.main = mainImage[0] ?? '';
    return response;
  };

  checkTypeFile = (element: string) => {
    let typeFile = '';
    switch (element) {
      case 'jpg':
      case 'png':
      case 'jpeg':
        typeFile = 'image';
        break;
      case 'mp4':
      case 'avi':
        typeFile = 'video';
        break;
      case 'mp3':
        typeFile = 'audio';
        break;
      default:
        typeFile = element ?? 'other';
        break;
    }
    return typeFile;
  };

  getFile = (slug: string, fileName = 'main') => {
    let response: string[] = [];
    const path = `${config.STATIC_UPLOADS}/${slug}/`;
    if (fs.existsSync(path)) {
      response = fs
        .readdirSync(path)
        .map((element: string) => `/${slug}/${element}`)
        .filter((element: string) => element.indexOf(fileName) > 0);
    }
    return response.pop();
  };

  // Complements
  getCountValues = (keysFiles: any) => {
    // Filter Data
    let count = 1;
    let response: any[] = [];
    let repeatData: any = this.checkDuplicates(
      keysFiles.map((element: string) => element.replace(/\[[0-9]\]/g, ''))
    );
    repeatData =
      typeof repeatData === 'undefined' || repeatData === null
        ? keysFiles
        : repeatData;
    if (keysFiles === repeatData) {
      response = repeatData;
    } else {
      repeatData.forEach((element: any) => {
        keysFiles.forEach((file: any) => {
          if (element === file.replace(/\[[0-9]\]/g, '')) {
            response[element] = count++;
          }
        });
        count = 0;
      });
    }
    return response;
  };

  checkDuplicates = (arr: any, justCheck: Boolean = false) => {
    let len = arr.length;
    const tmp: any = {};
    const arrtmp = arr.slice();
    const dupes = [];
    arrtmp.sort();
    while (len--) {
      let val: any = arrtmp[len];
      if (/nul|nan|infini/i.test(String(val))) {
        val = String(val);
      }
      if (tmp[JSON.stringify(val)]) {
        if (justCheck) {
          return true;
        }
        dupes.push(val);
      }
      tmp[JSON.stringify(val)] = true;
    }
    // eslint-disable-next-line no-nested-ternary
    return justCheck ? false : dupes.length ? dupes : null;
  };

  uploadSingleFile = (folderName: string, tempFile: any) => {
    const ext = Path.extname(tempFile.name);
    const pathFile = `${config.STATIC_UPLOADS}/${folderName}${ext}`.toLocaleLowerCase();
    tempFile.mv(pathFile);
  };

  constructor(route = 'users') {
    this.route = route;
  }
}
