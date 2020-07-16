import Boom from '@hapi/boom';
import {Request, Response, NextFunction} from 'express';
import {OK, BAD_REQUEST, getStatusText} from 'http-status-codes';

import {CODE_OK, CODE_ERROR} from '../../../resources/constants/codes.constant';
import {GradeService} from '../../services';
import config from '../../../config';
import {UploadAnyFiles} from '../../../utils/UploadFiles';
import {IUser, IComplements} from '../../../resources/interfaces';
import MailerService from '../../../utils/MailerService';

// Language
const language = `../../../resources/lang/${config.LANGUAGE}`;
const lang = require(language);

export class GradeController {
  private gradeService = new GradeService();
  //   'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
  all = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.gradeService.all();
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
    const content = await this.gradeService.index(id);
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
    const content = await this.gradeService.remove(id);
    await this.returnData(response, nextOrError, content);
  };

  create = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: IComplements.CRUD = request.body;
    const content = await this.gradeService.create(data);
    await this.returnData(response, nextOrError, content);
  };

  update = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const data: IComplements.CRUD = request.body;
    const content = await this.gradeService.update(id, data);
    await this.returnData(response, nextOrError, content);
  };

  private returnData(
    response: Response,
    nextOrError: NextFunction,
    content: any
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
