import Boom from '@hapi/boom';
import {Request, Response, NextFunction} from 'express';
import {OK, BAD_REQUEST, getStatusText} from 'http-status-codes';
import {FileArray} from 'express-fileupload';

import {CODE_OK, CODE_ERROR} from '../../resources/constants/codes.constant';
import {UploadAnyFiles} from '../../utils/UploadFiles';

export class ComplementResponse {
  returnData(
    response: Response,
    nextOrError: NextFunction,
    content: any,
    images:
      | {
          upload: boolean;
          router: string;
          files: FileArray | undefined;
          update?: boolean;
        }
      | undefined = undefined,
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
}
