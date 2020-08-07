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
    let response: string[] = [];
    const path = `${config.STATIC_UPLOADS}/${slug}/`;
    if (fs.existsSync(path)) {
      response = fs
        .readdirSync(path)
        .map((element: string) => `/${slug}/${element}`)
        .filter((element: string) => element.split('.').pop());
    }
    /* List By Type
      contentTemp.files = contentTemp.files.map((element) => {
        return process.env.URL_IMG + element
      })
      const extensions = contentTemp.files.map((element) => {
        return element.split('.').pop()
      })
      const unique = [...new Set(extensions)]
      const typeFiles = extensions.map(element => this.checkTypeFile(element))
      let newFiles = []
      typeFiles.forEach((element) => {
        newFiles.push([element, []])
      })
      newFiles = Object.fromEntries(new Map(newFiles))
      contentTemp.files.forEach((elementExt) => {
        unique.forEach((element) => {
          const extension = elementExt.split('.').pop()
          if (extension === element) {
            const typeFile = this.checkTypeFile(element)
            newFiles[typeFile].push(elementExt)
          }
        })
      })
      contentTemp.listFiles = newFiles

      const mainImage = contentTemp.files.filter(element => element.indexOf('main') > 0)
      contentTemp.mainImage = mainImage[0] ?? '
    */
    return response;
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
