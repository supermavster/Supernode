import {WhereAttributeHash} from 'sequelize/types';

import {UserToken} from '../../../models/UserToken';

export class UserTokenRepository {
  // User Token
  index = (where?: WhereAttributeHash): Promise<UserToken[]> => {
    return UserToken.findAll({where});
  };

  userToken = (where?: WhereAttributeHash): Promise<UserToken> => {
    return UserToken.findOne({where});
  };

  createUserToken = (data?: Object): Promise<UserToken> => {
    return UserToken.create(data);
  };
}
