import {Request, Response, NextFunction} from 'express';

import {SustainableService} from '../../services';
import {IComplements} from '../../../resources/interfaces';
import {ComplementResponse} from '../generic';

export class SustainableController {
  private sustainableService = new SustainableService();
  private complementResponse = new ComplementResponse();
  //   'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
  all = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.sustainableService.all();
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
    const content = await this.sustainableService.index(id);
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
    const content = await this.sustainableService.remove(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  create = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: IComplements.CRUDImage = request.body;
    const content = await this.sustainableService.create(data);
    await this.complementResponse.returnData(response, nextOrError, content, {
      upload: true,
      router: 'sustainables',
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
    const content = await this.sustainableService.update(id, data);
    await this.complementResponse.returnData(response, nextOrError, content, {
      upload: true,
      router: 'sustainables',
      files: request.files,
      update: true
    });
  };
}
