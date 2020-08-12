import {WhereAttributeHash, Model, FindOptions} from 'sequelize/types';

type T = any;

const getPagination = (page: number, size: number) => {
  const limit: number = size || 5;
  const offset: number = page ? page * limit : 0;
  return {limit, offset};
};

const getPagingData = (response: any, page: number, limit: number) => {
  const {count: totalItems, rows: data} = response;
  let currentPage: number = page || 0;
  let totalPages: number = Math.ceil(totalItems / limit);
  // Convert
  totalPages = Number(totalPages);
  currentPage = Number(currentPage);
  return {totalPages, currentPage, data};
};

export class Repository {
  isEmpty = (data: any) => {
    if (typeof data === 'object') {
      if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
        return true;
      } else if (!data) {
        return true;
      }
      return false;
    } else if (typeof data === 'string') {
      if (!data.trim()) {
        return true;
      }
      return false;
    } else if (typeof data === 'undefined') {
      return true;
    } else {
      return false;
    }
  };

  content = async (page: number, size: number, conditions?: FindOptions) => {
    let {limit, offset} = getPagination(page, size);
    // Convert
    limit = Number(limit);
    offset = Number(offset);
    // @ts-ignore
    const response: any = await this.model.findAndCountAll({
      offset,
      limit,
      ...conditions
    });
    return getPagingData(response, page, limit);
  };

  all = async (conditions?: FindOptions) => {
    // @ts-ignore
    const response: any = await this.model.findAll(conditions);
    return response;
  };

  index = async (conditions?: FindOptions) => {
    // @ts-ignore
    const response: any = await this.model.findOne(conditions);
    return response;
  };

  one = async (conditions?: FindOptions) => {
    // @ts-ignore
    const response: any = await this.model.findOne(conditions);
    return response;
  };

  singleCondition = async (where?: WhereAttributeHash) => {
    // @ts-ignore
    const response: any = await this.model.findOne({where});
    return response;
  };

  create = (data?: Object): Promise<T> => {
    // @ts-ignore
    return this.model.create(data);
  };

  update = (data: Object, where: WhereAttributeHash): Promise<T> => {
    // @ts-ignore
    return this.model.update(data, {where});
  };

  destroy = async (where?: WhereAttributeHash) => {
    // @ts-ignore
    await this.model.destroy({where});
  };

  model: typeof Model;

  public setModel(data: typeof Model) {
    this.model = data;
  }
}
