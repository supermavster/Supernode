import {UserToken} from '../../../models/UserToken';
import {Repository} from '../generic';
// export
export class UserTokenRepository extends Repository {
  constructor() {
    super(UserToken);
  }
}
