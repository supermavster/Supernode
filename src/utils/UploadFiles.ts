import sha1 from 'crypto-js/sha1';

import config from '../config';

const Path = require('path');
const fs = require('fs');

export class UploadAnyFiles {
  route: any;
  count: number = 0;
  filesExist: any;

  deleteFolderRecursive = (
    files: any,
    pathFolder: string,
    slug?: string,
    recursive: boolean = false
  ) => {
    if (!files) {
      throw new Error('Not Files');
    }
    const path = `${config.STATIC_UPLOADS}/${pathFolder}`;
    // Filter Data
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file: any) => {
        Object.keys(files).forEach((name) => {
          const regex = new RegExp(`\\b${name}\\b`, 'i');
          const curPath = Path.join(path, file);
          if (regex.test(file)) {
            if (!fs.lstatSync(curPath).isDirectory()) {
              //   // recurse
              //   this.deleteFolderRecursive(curPath, slug);
              // } else {
              // delete file
              fs.unlinkSync(curPath);
            }
          }
        });
      });
      // fs.rmdirSync(pathFolder);
    }
  };

  uploadFiles = (files: any, pathFolder: string, onlyFile: boolean = false) => {
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
      const routeFile = onlyFile ? pathFolder : `${pathFolder}/${name}`;
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
    let response: any = [];
    const path = `${config.STATIC_UPLOADS}/${slug}`;
    const splitArray = path.split('/');
    const title: any = splitArray.pop();
    const tempSingleElement = splitArray.join('/');
    if (fs.existsSync(`${path}/`)) {
      response = fs
        .readdirSync(`${path}/`)
        .map((element: string) => `/${slug}/${element}`)
        .filter((element: string) => element.indexOf(fileName) > 0);
      return response.pop();
    } else if (fs.existsSync(tempSingleElement)) {
      const filesData = fs.readdirSync(tempSingleElement);
      const tempSlug = slug.split('/');
      tempSlug.pop();
      const tempItem = tempSlug.join('/');
      response = filesData
        .map((element: string) => `${tempItem}/${element}`)
        .filter((element: string) => element.indexOf(title) > -1);
      response = response.pop();
      return response;
    }
    return null;
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

  getTitleItemsByType = (dataMain: any) => {
    const groupBy = (key: any) => (array: any) =>
      array.reduce((objectsByKeyValue: any, obj: any) => {
        const value = obj[key];
        // eslint-disable-next-line no-param-reassign
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});
    // eslint-disable-next-line func-style
    const reduceData = function (data: any) {
      return Array.from(
        {length: Math.max(...data.map((object: any) => object.length))},
        (_: any, index: any) =>
          data.reduceRight(
            (reducer: any, object: any) =>
              index < object.length ? [...reducer, object[index]] : reducer,
            []
          )
      ).flat();
    };
    // Data
    const filterData = dataMain
      .map((element: any) => {
        return {
          id: element.get('id'),
          files: element.get('files')
        };
      })
      .filter(
        (element: any) =>
          typeof element !== 'undefined' &&
          typeof element.files !== 'undefined' &&
          typeof element.files.orderByType !== 'undefined' &&
          Object.keys(element.files.orderByType).length > 0
      );
    // Filter by object
    const keys = filterData.map((element: any) => {
      return {id: element.id, elements: Object.keys(element.files.orderByType)};
    });
    const groupByBrand = groupBy('elements');
    const groupElements = groupByBrand(keys);
    // Single Data
    const singleData = Object.keys(groupElements).map((element) =>
      element.split(',')
    );
    const count = reduceData(singleData).reduce((items, key) => {
      // eslint-disable-next-line no-param-reassign
      items[key] = (items[key] || 0) + 1;
      return items;
    }, {});
    let newResponse: any = [];
    Object.keys(count).forEach((element) => {
      newResponse.push([element, []]);
    });
    newResponse = Object.fromEntries(new Map(newResponse));
    Object.keys(groupElements).forEach((element) => {
      element.split(',').forEach((data) => {
        // eslint-disable-next-line array-callback-return
        Object.keys(count).map((elementCount: any) => {
          if (elementCount === data) {
            newResponse[elementCount].push(
              groupElements[element].map((el: any) => el.id)
            );
          }
        });
      });
    });
    const lastFilterData: any = [];
    Object.keys(newResponse).forEach((element) => {
      lastFilterData.push([element, reduceData(newResponse[element])]);
    });
    newResponse = Object.fromEntries(new Map(lastFilterData));
    Object.keys(newResponse).forEach((element) => {
      const newData: any = [];
      newResponse[element].forEach((data: any) => {
        dataMain.forEach((item: any) => {
          if (item.get('id') === data) {
            newData.push(item);
          }
        });
        newResponse[element] = newData;
      });
    });
    return newResponse;
  };

  // Complement
  existItemFile = (slugFile: string, directory = config.STATIC_UPLOADS) => {
    const path = `${directory}/${slugFile}`;
    return fs.existsSync(path);
  };

  setURL = (file: any, array = false) => {
    if (array) {
      return file.map((item: any) => {
        return this.setSingleURL(item);
      });
    } else {
      return this.setSingleURL(file);
    }
  };

  setSingleURL = (file: any) => {
    if (file.substr(0, 1) !== '/') {
      // eslint-disable-next-line no-param-reassign
      file = `/${file}`;
    }
    return `${config.BASE_URL_FILES}${file}`;
  };

  constructor(route = 'users') {
    this.route = route;
  }
}
