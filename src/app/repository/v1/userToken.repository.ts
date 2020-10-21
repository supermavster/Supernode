import {SystemUsers} from '../../models/SystemUsers';
import {SystemUserToken} from '../../models/SystemUserToken';
import {Repository} from '../generic';
// export
export class UserTokenRepository extends Repository {
  findBySUID = async (suid: string) => {
    const response = await this.singleCondition({suid});
    return response;
  };

  findUserByAuthToken = async (authToken: string) => {
    const response = await this.singleCondition({authToken});
    return response;
  };

  constructor() {
    super();
    this.setModel(SystemUserToken);
  }
}
