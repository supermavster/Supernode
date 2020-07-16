import {WhereAttributeHash} from 'sequelize/types';

import {City} from '../../../models/City';

export class CityRepository {
  index = (where?: WhereAttributeHash): Promise<City> => {
    return City.findOne({where});
  };

  all = (where?: WhereAttributeHash): Promise<City[]> => {
    return City.findAll({where});
  };

  create = (data?: Object): Promise<City> => {
    return City.create(data);
  };

  update = (data: Object, where: WhereAttributeHash): Promise<City> => {
    return City.update(data, {where});
  };

  destroy = async (where?: WhereAttributeHash) => {
    await City.destroy({where});
  };
}
