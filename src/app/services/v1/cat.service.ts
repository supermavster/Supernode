// import sha1 from 'crypto-js/sha1';

import {GeneralServiceResponse, Service} from '../generic';
// import config from '../../../config';
import {CatRepository} from '../../repository';
import {ICat, IComplements} from '../../../resources/interfaces';
// // Language
// const language = `../../../resources/lang/${config.LANGUAGE}`;
// const lang = require(language);
export class CatService extends Service {
  // Another Repositories
  repository = new CatRepository();
  // repositoryMain: CategoryRepository = new CategoryRepository();

  create = async (request: any) => {
    let data = await this.repository.create(request);
    // Map Foreign
    data = this.getExtraInfo(data);
    return GeneralServiceResponse(data);
  };

  update = async (id: any, request: any) => {
    let data = await this.repository.update(request, id);
    // Map Foreign
    data = this.getExtraInfo(data);
    return GeneralServiceResponse(data);
  };

  all = async () => {
    let data: any = await this.repository.allActive();
    data = data.map((element: any) => {
      return this.getExtraInfo(element);
    });
    return GeneralServiceResponse(data);
  };

  getExtraInfo = (data: any) => {
    const location = data.dataValues.locationCategory
      .map((element: any) => {
        return element.dataValues;
      })
      .pop();
    // eslint-disable-next-line no-param-reassign
    delete data.dataValues.locationCategory;
    // eslint-disable-next-line no-param-reassign
    data.dataValues = {...data.dataValues, ...location};
    return data;
  };

  getFiles = async (request: IComplements.ID, files = ['image']) => {
    const id: number = request.id;
    const data = await this.repository.getFiles({categoryId: id}, files);
    const response = data.dataValues.image ?? null;
    return GeneralServiceResponse(response);
  };

  contentPagination = async (filter: IComplements.FILTER) => {
    const response: any = await this.repository.contentPagination(filter);
    response.data = response.data.map((element: any) => {
      // eslint-disable-next-line no-param-reassign
      element.dataValues.subcategoryCount =
        element.dataValues.subcategory.length;
      return this.getExtraInfo(element);
    });
    return GeneralServiceResponse(response);
  };

  index = async (request: any) => {
    const id: number = request.id;
    let data = await this.repository.findCategoryByID(id);
    data = this.getExtraInfo(data);
    return GeneralServiceResponse(data);
  };

  constructor() {
    super();
    this.setRepository(this.repository);
  }
}
