import {WhereAttributeHash} from 'sequelize/types';

import {Users} from '../../../models/Users';

export class UsersRepository {
  index = (where?: WhereAttributeHash): Promise<Users[]> => {
    return Users.findAll({where});
  };

  // User
  user = (where?: WhereAttributeHash): Promise<Users> => {
    return Users.findOne({where});
  };

  createUsers = (data?: Object): Promise<Users> => {
    return Users.create(data);
  };

  updateUser = (data: Object, where: WhereAttributeHash): Promise<Users> => {
    return Users.update(data, {where});
  };
}
