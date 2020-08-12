import {Op} from 'sequelize';

import {Repository} from '../generic';
import {Cat} from '../../models/Cat';
import {IComplements, ICat} from '../../../resources/interfaces';
// export
export class CatRepository extends Repository {
  allActive = async () => {
    const reponse = await this.all({
      where: {status: 'active'}
    });
    return reponse;
  };

  contentPagination = async (filter: ICat.FILTER) => {
    const tempFilter: IComplements.FILTER = {...filter};
    switch (filter.filter) {
      case 'publish':
        tempFilter.conditions = {
          isDraw: false,
          dateApprove: {
            [Op.not]: null
          }
        };
        break;
      case 'draws':
        tempFilter.conditions = {
          catId: filter.catId
        };
        break;
      default:
        return [];
    }
    const response = await this.contentBase(tempFilter);
    return response;
  };

  contentBase = async (filter: IComplements.FILTER) => {
    const where = {
      status: 'active'
    };
    Object.assign(where, filter.conditions);
    const response = await this.content(filter.offset, filter.limit, {
      where,
      order: [['createdAt', 'DESC']]
      // include: [Category, Sustainable, UserClient]
    });
    return response;
  };

  constructor() {
    super();
    this.setModel(Cat);
  }
}
