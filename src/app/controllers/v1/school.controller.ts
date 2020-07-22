import {Request, Response, NextFunction} from 'express';

import {SchoolService} from '../../services';
import {IComplements} from '../../../resources/interfaces';
import {ComplementResponse} from '../generic';

export class SchoolController {
  private schoolService = new SchoolService();
  private complementResponse = new ComplementResponse();
  //   'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
  all = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.schoolService.all();
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  get = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const content = await this.schoolService.index(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  del = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const content = await this.schoolService.remove(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  create = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: IComplements.CRUDImage = request.body;
    const content = await this.schoolService.create(data);
    await this.complementResponse.returnData(response, nextOrError, content, {
      upload: true,
      router: 'schools',
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
    const content = await this.schoolService.update(id, data);
    await this.complementResponse.returnData(response, nextOrError, content, {
      upload: true,
      router: 'schools',
      files: request.files,
      update: true
    });
  };
}
