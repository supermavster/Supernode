import {Request, Response, NextFunction} from 'express';

import {SubCategoryService} from '../../services';
import {ICategory, IComplements} from '../../../resources/interfaces';
import {Controller as ComplementResponse} from '../generic';

export class SubcategoryController {
  private complementResponse = new ComplementResponse();
  private subcategoryService = new SubCategoryService();

  // Config
  getRouterFile = () => {
    return 'categories/';
  };

  //   'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any> {
  all = async (
    _request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const content = await this.subcategoryService.all();
    await this.complementResponse.returnData(response, nextOrError, content, {
      singleFile: true,
      router: this.getRouterFile(),
      addUrl: true
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
    const content = await this.subcategoryService.index(id);
    await this.complementResponse.returnData(response, nextOrError, content, {
      singleFile: true,
      router: this.getRouterFile(),
      addUrl: true
    });
  };

  del = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const content = await this.subcategoryService.remove(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  create = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: ICategory.CRUD = request.body;
    const content = await this.subcategoryService.create(
      data,
      this.getRouterFile()
    );
    await this.complementResponse.returnData(response, nextOrError, content, {
      upload: true,
      files: request.files,
      onlyFile: true
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
    const data: ICategory.CRUD = request.body;
    const content = await this.subcategoryService.update(id, data);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  deactivate = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    // eslint-disable-next-line radix
    const id: IComplements.ID = {id: parseInt(request.params.id)};
    const content = await this.subcategoryService.deactivate(id);
    await this.complementResponse.returnData(response, nextOrError, content);
  };

  changeStatus = async (
    request: Request,
    response: Response,
    nextOrError: NextFunction
  ) => {
    // Generate Logic
    const data: ICategory.ChangeStatusDTO = {
      // eslint-disable-next-line radix
      id: parseInt(request.params.id),
      ...request.body
    };
    const content = await this.subcategoryService.changeStatus(data);
    await this.complementResponse.returnData(response, nextOrError, content);
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
    const content: any = await this.subcategoryService.contentPagination(
      filter
    );
    // Add Files Data
    await this.complementResponse.returnData(response, nextOrError, content, {
      singleFile: true,
      router: this.getRouterFile(),
      addUrl: true,
      pagination: true
    });
  };
}
