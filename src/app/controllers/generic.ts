import Boom from '@hapi/boom';
import {Request, Response, NextFunction} from 'express';
import {OK, BAD_REQUEST} from 'http-status-codes';

import config from '../../config';
import {CODE_OK, CODE_ERROR} from '../../resources/constants/codes.constant';
import {UploadAnyFiles} from '../../utils/UploadFiles';
import {isEmpty} from '../../utils/FormatData';
import {AWSUpload} from '../../utils/AWSUploadFiles';
import {MultiFiles} from '../../resources/interfaces/complements.interface';
import {Service} from '../services/generic';
import {IComplements} from '../../resources/interfaces';

const pathLib = require('path');

export class Controller {
  service: Service;

  aws: any;
  filesAWS: any;

  updateAWS = async (tempFiles: any, files: any, router: any) => {
    await this.aws.deleteFiles(tempFiles);
    const response = await this.uploadAWS(files, router);
    return response;
  };

  uploadAWS = async (files: any, router: any) => {
    this.aws.setUploadFolder(pathLib.join(config.STATIC_UPLOADS, router));
    const responseAWS = await this.aws.uploadFiles(files);
    this.filesAWS = await responseAWS;
    return this.filesAWS;
  };

  getFilesAWS = (oneFile = false) => {
    const response = this.filesAWS;
    if (oneFile) {
      return response.pop();
    }
    return response;
  };

  // Complements
  getNewSlug = (content: any, path: string) => {
    let data: any;
    const response = content;
    if (Array.isArray(response.data)) {
      data = [];
      response.data.forEach((element: any) => {
        const component = this.getSpecificData(element, path);
        data.push(component);
      });
    } else {
      data = this.getSpecificData(response.data, path);
    }
    response.data = data;
    return response;
  };

  getSpecificData = (element: any, path: string) => {
    let slug: any;
    if (typeof element === 'object') {
      slug = element.get('slug');
    } else {
      slug = element.slug;
    }
    const routeFile =
      typeof path !== 'undefined' && path !== null ? `${path}/${slug}` : slug;
    element.set('slug', routeFile);
    return element;
  };

  // Config
  getRouterFile = () => {
    return '';
  };

  //   'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
  all = async (
    _request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // @ts-ignore
    const content = await this.service.all();
    await this.returnData(response, nextOrError, content);
  };

  get = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: any = {id: parseInt(request.params.id)};
    // @ts-ignore
    const content = await this.service.index(id);
    await this.returnData(response, nextOrError, content);
  };

  del = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: any = {id: parseInt(request.params.id)};
    // @ts-ignore
    const content = await this.service.remove(id);
    await this.returnData(response, nextOrError, content);
  };

  create = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    let data: any = request.body;
    if (
      typeof request.files !== 'undefined' &&
      request.files !== null &&
      !isEmpty(request.files)
    ) {
      const files = await this.uploadAWS(request.files, this.getRouterFile());
      data = {...data, ...files};
    }
    // @ts-ignore
    const content: any = await this.service.create(data);
    await this.returnData(response, nextOrError, content);
  };

  update = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: any = {id: parseInt(request.params.id)};
    let data: any = request.body;
    if (
      typeof request.files !== 'undefined' &&
      request.files !== null &&
      !isEmpty(request.files)
    ) {
      // @ts-ignore
      const tempFiles = await this.service.getFiles(id);
      if (tempFiles.status) {
        const filesTemp = Array.isArray(tempFiles.data)
          ? [].concat(...tempFiles.data)
          : [tempFiles.data];
        const files = await this.updateAWS(
          filesTemp,
          request.files,
          this.getRouterFile()
        );
        data = {...data, ...files};
      }
    }
    // @ts-ignore
    const content = await this.service.update(id, data);
    await this.returnData(response, nextOrError, content);
  };

  deactivate = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: any = {id: parseInt(request.params.id)};
    // @ts-ignore
    const content = await this.service.deactivate(id);
    await this.returnData(response, nextOrError, content);
  };

  changeStatus = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: any = {
      // eslint-disable-next-line radix
      id: parseInt(request.params.id),
      ...request.body
    };
    // @ts-ignore
    const content = await this.service.changeStatus(data);
    await this.returnData(response, nextOrError, content);
  };

  // Get Pagination
  content = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const params: any = request.params;
    const filter: IComplements.FILTER = params;
    // @ts-ignore
    const content: any = await this.service.contentPagination(filter);
    // Add Files Data
    await this.returnData(response, nextOrError, content);
  };

  constructor() {
    const awsData: any = config.AWS;
    if (typeof awsData !== 'undefined' && awsData.AWS_ENABLE) {
      this.aws = new AWSUpload(
        awsData.AWS_ACCESS_KEY_ID,
        awsData.AWS_SECRET_ACCESS_KEY,
        awsData.AWS_BUCKET_NAME
      );
    }
  }

  singleFile(body: any, images: any) {
    // Data Base
    const uploadAnyFiles = new UploadAnyFiles();
    let slug = '';
    if (typeof body.dataValues === 'undefined') {
      slug = body.slug;
    } else {
      slug = body.get('slug');
    }
    if (typeof images !== 'undefined' && images !== null && images) {
      // Remove Files
      const routerTemp: string =
        typeof images.router !== 'undefined' && images.router !== null
          ? `${images.router}/${slug}`
          : slug;
      // Update File
      if (
        typeof images.files !== 'undefined' &&
        images.files !== null &&
        ((typeof images.upload !== 'undefined' && images.upload !== null) ||
          (typeof images.update !== 'undefined' && images.update !== null))
      ) {
        // Update Images SLUG
        if (images.update) {
          if (typeof images.router !== 'undefined' && images.router !== null) {
            slug = '';
          }
          uploadAnyFiles.deleteFolderRecursive(images.files, routerTemp);
        }
        // Upload File
        uploadAnyFiles.uploadFiles(images.files, routerTemp, images.onlyFile);
      }
      // Single Element
      if (
        typeof images.singleFile !== 'undefined' &&
        images.singleFile !== null
      ) {
        if (images.recursive) {
          slug = routerTemp;
        }
        let file: any = uploadAnyFiles.getFile(slug);
        if (typeof file !== 'undefined' && file !== null) {
          if (
            typeof images.addUrl !== 'undefined' &&
            images.addUrl !== null &&
            typeof file !== 'undefined' &&
            file !== null
          ) {
            file = uploadAnyFiles.setURL(file);
          }
          // } else {
          //   file = uploadAnyFiles.existItemFile(slug) ? slug : 'default.png';
          // }
          // eslint-disable-next-line no-param-reassign
          body.dataValues.file = file;
        }
      }
      // List Elements
      if (typeof images.listAll !== 'undefined' && images.listAll !== null) {
        let files: any = uploadAnyFiles.getFiles(slug);
        if (typeof files !== 'undefined' && files !== null) {
          if (typeof images.addUrl !== 'undefined' && images.addUrl !== null) {
            files = uploadAnyFiles.setURL(files, true);
          }
          // eslint-disable-next-line no-param-reassign
          body.dataValues.files = files;
        }
      }
    }
  }

  returnData(
    response: Response,
    nextOrError: NextFunction,
    content: any,
    images: MultiFiles | undefined = undefined,
    middleware: boolean = false
  ) {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;
    // To send response
    let message: any;
    let body: any;
    if (typeof content === 'undefined' || !content || !content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
    }

    if (
      typeof content !== 'undefined' &&
      typeof content.message !== 'undefined' &&
      content.message
    ) {
      message = content.message;
    }
    if (typeof content !== 'undefined' && typeof content.data !== 'undefined') {
      body = content.data;

      if (typeof images !== 'undefined') {
        let tempBody: any = null;
        if (typeof images.pagination !== 'undefined') {
          tempBody = body;
          body = body.data;
          delete tempBody.data;
        }
        this.filterFiles(body, images);
        if (
          typeof images.getByTypeItem !== 'undefined' &&
          images.getByTypeItem !== null
        ) {
          const uploadAnyFiles = new UploadAnyFiles();
          body = uploadAnyFiles.getTitleItemsByType(body);
        }
        if (typeof images.pagination !== 'undefined') {
          body = {...tempBody, data: body};
        }
      }
    }

    if (!middleware) {
      response.status(codeResponse).json({
        success: codeResponse === OK,
        code,
        message,
        body
      });
    }
    if (
      typeof content !== 'undefined' &&
      typeof content.status !== 'undefined' &&
      !content.status
    ) {
      nextOrError(Boom.badRequest(message));
    }
  }

  filterFiles(body: any, images: any) {
    if (Array.isArray(body)) {
      body.forEach((element: any) => {
        this.singleFile(element, images);
        if (typeof images.recursive !== 'undefined') {
          this.recursiveData(images.recursive, element, images);
        }
      });
    } else {
      this.singleFile(body, images);
    }
  }

  recursiveData(recursive: any, element: any, images: any) {
    recursive.forEach((item: any) => {
      if (Array.isArray(item)) {
        this.recursiveData(item, element.get(item), images);
      } else {
        // eslint-disable-next-line no-console
        console.info('Recursive: ', item);
        // Data Complement
        if (element.get(item)) {
          this.filterFiles(element.get(item), images);
        }
      }
    });
  }

  public setService(data: Service) {
    this.service = data;
  }
}
