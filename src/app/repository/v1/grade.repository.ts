import {WhereAttributeHash} from 'sequelize/types';

import {Grade} from '../../../models/Grade';

export class GradeRepository {
  index = (where?: WhereAttributeHash): Promise<Grade> => {
    return Grade.findOne({where});
  };

  all = (where?: WhereAttributeHash): Promise<Grade[]> => {
    return Grade.findAll({where});
  };

  create = (data?: Object): Promise<Grade> => {
    return Grade.create(data);
  };

  update = (data: Object, where: WhereAttributeHash): Promise<Grade> => {
    return Grade.update(data, {where});
  };

  destroy = async (where?: WhereAttributeHash) => {
    await Grade.destroy({where});
  };
}
