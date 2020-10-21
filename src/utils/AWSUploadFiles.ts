import sha1 from 'crypto-js/sha1';

const path = require('path');
const fs = require('fs');

const AWS = require('aws-sdk');

export class AWSUpload {
  // Const
  S3: any;
  uploadFolder: any;
  bucket: any;

  deleteFiles = async (files: any) => {
    if (typeof files === 'undefined' || files === null || !files) {
      throw new Error('Not found Files');
    }
    const deleteParam = {
      Bucket: `${this.bucket}`,
      Delete: {
        Objects: files.map((Key: any) => ({Key}))
      }
    };
    await this.S3.deleteObjects(deleteParam, (err: any, data: any) => {
      if (err) throw new Error(err);
    });
  };

  uploadFiles = async (files: any, filePath: string = '') => {
    const keys = Object.keys(files);
    let count = 0;
    const lastFilterData: any = [];
    for await (const file of keys) {
      const tempFile = files[file];
      const id = keys[count++];
      let data: any = await this.uploadFile(tempFile, filePath);
      // Filter Data
      if (data && data.data) {
        data = data.data.Location;
      } else {
        data = 'ERROR to Upload';
      }
      lastFilterData.push([id, data]);
    }
    const newResponse = Object.fromEntries(new Map(lastFilterData));
    return newResponse;
  };

  uploadFile = async (file: any, filePath: string = '') => {
    const newName = this.generateName(file);
    const newFilename = path.resolve(this.uploadFolder, filePath, newName);
    const router = path.resolve(this.uploadFolder, filePath);
    // Make File
    if (!fs.existsSync(router)) {
      fs.mkdirSync(router, {recursive: true});
    }
    // Move The file
    const response = await this.checkFiles(file, newFilename);
    // await fs.unlinkSync(this.uploadFolder);
    // await this.delay();
    return response;
  };

  delay = () => {
    return new Promise((resolve) => setTimeout(resolve, 300));
  };

  moveFile = async (file: any, router: any) => {
    // Parm
    const uploadData = {
      Bucket: `${this.bucket}`,
      Key: `${this.uploadFolder}/${path.basename(router)}`,
      Body: file.data,
      ACL: 'public-read'
    };
    const data = await this.uploadAWS(uploadData, router);
    return {status: true, data};
  };

  closeReadStream = (stream: any) => {
    if (!stream) return;
    if (stream.close) stream.close();
    if (stream.destroy) stream.destroy();
  };

  createBucket = (params: any) => {
    const {Bucket} = params;
    this.S3.listMultipartUploads({Bucket}, function (err: any, data: any) {
      // eslint-disable-next-line no-console
      if (err) console.log(err, err.stack);
      // eslint-disable-next-line no-console
      else console.log(data);
    });
  };

  listFolders = () => {
    this.S3.listBuckets({}, function (err: any, data: any) {
      // eslint-disable-next-line no-console
      if (err) console.log(err, err.stack);
      // eslint-disable-next-line no-console
      else console.log(data);
    });
  };

  checkFiles = async (file: any, router: any) => {
    try {
      const response = await this.moveFile(file, router);
      return response;
    } catch (error) {
      return {status: false, error};
    }
  };

  uploadAWS = async (uploadData: any, router: string) => {
    // this.listFolders();
    const response = await this.S3.upload(uploadData).promise();
    return response;
  };

  generateName = (file: any) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const name = sha1(uniqueSuffix).toString();
    const ext = path.extname(file.name);
    return `${name}-${Date.now()}${ext}`;
  };

  setUploadFolder = (uploadFolder: string) => {
    this.uploadFolder = uploadFolder;
  };

  // Methods
  constructor(
    accessKeyId: string,
    secretAccessKey: string,
    bucket: string,
    uploadFolder: string = ''
  ) {
    this.S3 = new AWS.S3({
      accessKeyId,
      secretAccessKey
    });
    this.uploadFolder = uploadFolder;
    this.bucket = bucket;
  }
}
