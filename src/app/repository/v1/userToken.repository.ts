import {UserToken} from '../../models/UserToken';
import {Repository} from '../generic';
// export
export class UserTokenRepository extends Repository {
  findByUID = async (uid: string) => {
    const response = await this.singleCondition({uid});
    return response;
  };

  findUserByAuthToken = async (authToken: string) => {
    const response = await this.singleCondition({authToken});
    return response;
  };

  constructor() {
    super();
    this.setModel(UserToken);
  }
}
