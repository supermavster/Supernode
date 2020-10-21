import {WhereAttributeHash, Model, FindOptions} from 'sequelize/types';

type T = any;

const getPagination = (page: number, size: number) => {
  const limit: number = size || 20;
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

  allActive = async () => {
    // @ts-ignore
    const response: any = await this.model.findAll({
      where: {status: 'active'}
    });
    return response;
  };

  contentPagination = async (filter: any) => {
    const where = {};
    if (filter.conditions) Object.assign(where, filter.conditions);
    const response = await this.content(filter.offset, filter.limit, {
      where,
      order: [['createdAt', 'DESC']]
    });
    return response;
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

  getFiles = async (
    where?: WhereAttributeHash,
    attributes: any = ['image']
  ) => {
    // @ts-ignore
    const response: any = await this.model.findOne({
      attributes,
      where
    });
    return response;
  };

  findCreate = (data?: Object): Promise<T> => {
    // @ts-ignore
    return this.model.findCreate(data);
  };

  create = (data?: Object): Promise<T> => {
    // @ts-ignore
    const response: any = this.model.create(data, {isNewRecord: true});
    return response;
  };

  update = (data: Object, where: WhereAttributeHash): Promise<T> => {
    // @ts-ignore
    this.model.update(data, {where});
    // @ts-ignore
    return this.model.findOne({where});
  };

  destroy = async (where?: WhereAttributeHash) => {
    // @ts-ignore
    await this.model.destroy({where});
  };

  deactivate = (where: WhereAttributeHash): Promise<T> => {
    // @ts-ignore
    return this.model.update({status: 'inactive'}, {where});
  };

  changeStatus = async (
    where: WhereAttributeHash,
    status: string
  ): Promise<T> => {
    // @ts-ignore
    await this.model.update({status}, {where});
    const response = await this.singleCondition(where);
    return response;
  };

  model: typeof Model;

  public setModel(data: typeof Model) {
    this.model = data;
  }
}
