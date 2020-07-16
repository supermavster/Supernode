import {WhereAttributeHash} from 'sequelize/types';

import {PasswordReset} from '../../../models/PasswordReset';

export class PasswordResetRepository {
  // Password Reset
  index = (where?: WhereAttributeHash): Promise<PasswordReset[]> => {
    return PasswordReset.findAll({where});
  };

  passwordReset = (where?: WhereAttributeHash): Promise<PasswordReset> => {
    return PasswordReset.findOne({where});
  };

  createPasswordReset = (data?: Object): Promise<PasswordReset> => {
    return PasswordReset.create(data);
  };

  destroyPasswordReset = async (where?: WhereAttributeHash) => {
    await PasswordReset.destroy({where});
  };
}
