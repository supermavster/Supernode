import {WhereAttributeHash} from 'sequelize/types';

type T = any;

export class Repository {
  model: any;
  index = (where?: WhereAttributeHash): Promise<T> => {
    return this.model.findOne({where});
  };

  all = (where?: WhereAttributeHash): Promise<T[]> => {
    return this.model.findAll({where});
  };

  create = (data?: Object): Promise<T> => {
    return this.model.create(data);
  };

  update = (data: Object, where: WhereAttributeHash): Promise<T> => {
    return this.model.update(data, {where});
  };

  destroy = async (where?: WhereAttributeHash) => {
    await this.model.destroy({where});
  };

  constructor(model: T) {
    this.model = model;
  }
}
