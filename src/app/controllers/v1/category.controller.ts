import {Request, Response, NextFunction} from 'express';

import {CategoryService} from '../../services';
import {IComplements} from '../../../resources/interfaces';
import {ComplementResponse} from '../generic';

export class CategoryController {
  private complementResponse = new ComplementResponse();
  private categoryService = new CategoryService();
  //   'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
  all = async (
    _request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.categoryService.all();
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
    const content = await this.categoryService.index(id);
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
    const content = await this.categoryService.remove(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  create = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: IComplements.CRUD = request.body;
    const content = await this.categoryService.create(data);
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
    const content = await this.categoryService.update(id, data);
    await this.complementResponse.returnData(response, nextOrError, content);
  };
}
