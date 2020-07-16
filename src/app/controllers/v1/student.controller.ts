import Boom from '@hapi/boom';
import {Request, Response, NextFunction} from 'express';
import {OK, BAD_REQUEST, getStatusText} from 'http-status-codes';

import {CODE_OK, CODE_ERROR} from '../../../resources/constants/codes.constant';
import {StudentService} from '../../services';
import {UploadAnyFiles} from '../../../utils/UploadFiles';
import {IComplements} from '../../../resources/interfaces';

export class StudentController {
  private studentService = new StudentService();
  //   'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
  all = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.studentService.all();
    await this.returnData(response, nextOrError, content);
  };

  get = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const content = await this.studentService.index(id);
    await this.returnData(response, nextOrError, content);
  };

  del = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const content = await this.studentService.remove(id);
    await this.returnData(response, nextOrError, content);
  };

  create = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: IComplements.CRUDImage = request.body;
    const content = await this.studentService.create(data);
    await this.returnData(response, nextOrError, content, {
      upload: true,
      router: 'students',
      files: request.files
    });
  };

  update = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const data: IComplements.CRUDImage = request.body;
    const content = await this.studentService.update(id, data);
    await this.returnData(response, nextOrError, content, {
      upload: true,
      router: 'students',
      files: request.files,
      update: true
    });
  };

  private returnData(
    response: Response,
    nextOrError: NextFunction,
    content: any,
    images:
      | {
          upload: boolean;
          router: string;
          files: import('express-fileupload').FileArray | undefined;
          update?: boolean;
        }
      | undefined = undefined
  ) {
    // Context Base
    let codeResponse = OK;
    let code = CODE_OK;
    // To send response
    let body: any;
    if (typeof content === 'undefined' || !content || !content.status) {
      codeResponse = BAD_REQUEST;
      code = CODE_ERROR;
    }

    const message = content.message;
    if (typeof content.data !== 'undefined') {
      body = content.data;
      if (
        typeof body.slug !== 'undefined' &&
        typeof images!.upload !== 'undefined' &&
        typeof images!.router !== 'undefined' &&
        typeof images!.files !== 'undefined'
      ) {
        const uploadAnyFiles = new UploadAnyFiles();
        if (images!.update) {
          // Remove Files
          uploadAnyFiles.deleteFolderRecursive(images!.router, body.slug);
        }
        // Upload File
        uploadAnyFiles.uploadFiles(images!.files, images!.router, body.slug);
      }
    }

    response.status(codeResponse).json({
      success: getStatusText(codeResponse),
      code,
      message,
      body
    });
    if (!content.status) {
      nextOrError(Boom.badRequest(message));
    }
  }
}
