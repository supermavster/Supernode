import {WhereAttributeHash} from 'sequelize/types';

import {School} from '../../../models/School';

export class SchoolRepository {
  index = (where?: WhereAttributeHash): Promise<School> => {
    return School.findOne({where});
  };

  all = (where?: WhereAttributeHash): Promise<School[]> => {
    return School.findAll({where});
  };

  create = (data?: Object): Promise<School> => {
    return School.create(data);
  };

  update = (data: Object, where: WhereAttributeHash): Promise<School> => {
    return School.update(data, {where});
  };

  destroy = async (where?: WhereAttributeHash) => {
    await School.destroy({where});
  };
}
