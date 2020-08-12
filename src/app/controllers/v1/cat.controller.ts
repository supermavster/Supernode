import {Request, Response, NextFunction} from 'express';

import {CatService} from '../../services';
import {IComplements} from '../../../resources/interfaces';
import {ComplementResponse} from '../generic';

export class CatController {
  private complementResponse = new ComplementResponse();
  private catService = new CatService();
  //   'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
  all = async (
    _request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.catService.all();
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  // Get Pagination
  contentPagination = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const params: any = request.params;
    const filter: IComplements.FILTER = params;
    const content: any = await this.catService.contentPagination(filter);
    // Add Files Data
    await this.complementResponse.returnData(response, nextOrError, content, {
      singleFile: true,
      pagination: true
    });
  };

  get = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const content = await this.catService.index(id);
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
    const content = await this.catService.remove(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  create = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: IComplements.CRUD = request.body;
    const content = await this.catService.create(data);
    await this.complementResponse.returnData(response, nextOrError, content);
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
    const content = await this.catService.update(id, data);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  deactivate = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    const id: IComplements.ID = request.params;
    const content = await this.catService.deactivate(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };
}
