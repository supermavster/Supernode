import {Users} from '../../../models/Users';
import {Repository} from '../generic';
// export
export class UsersRepository extends Repository {
  constructor() {
    super(Users);
  }
}
