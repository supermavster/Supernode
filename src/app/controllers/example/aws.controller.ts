import {Request, Response, NextFunction} from 'express';

import {CategoryService} from '../../services';
import {ICategory, IComplements} from '../../../resources/interfaces';
import {Controller as ComplementResponse} from '../generic';

export class CategoryController {
  private complementResponse = new ComplementResponse();
  private categoryService = new CategoryService();

  // Config
  getRouterFile = () => {
    return 'categories';
  };

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
    const data: ICategory.CRUD = request.body;
    await this.complementResponse.uploadAWS(
      request.files,
      this.getRouterFile()
    );
    data.image = this.complementResponse.getFilesAWS(true);
    const content = await this.categoryService.create(data);
    // }
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
    const data: ICategory.CRUD = request.body;
    if (request.files) {
      const tempFiles = await this.categoryService.getFiles(id);
      data.image = await this.complementResponse.updateAWS(
        tempFiles,
        request.files,
        this.getRouterFile()
      );
    }
    const content = await this.categoryService.update(id, data);
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
    const content = await this.categoryService.deactivate(id);
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
    const content = await this.categoryService.changeStatus(data);
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
    const content: any = await this.categoryService.contentPagination(filter);
    // Add Files Data
    await this.complementResponse.returnData(response, nextOrError, content);
  };
}
