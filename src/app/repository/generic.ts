import {WhereAttributeHash, Model, FindOptions} from 'sequelize/types';

type T = any;

export class Repository {
  /*
    where?: WhereAttributeHash,
    // include?: Model[],
    order?: String[],
    attributes?: String[]
  */
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

  deactivate = (where?: WhereAttributeHash): Promise<T> => {
    // @ts-ignore
    return this.model.update({status: 'inactive'}, {where});
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
