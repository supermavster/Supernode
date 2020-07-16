import {UserClient} from '../../../models/UserClient';
import {Repository} from '../generic';
// export
export class StudentRepository extends Repository {
  constructor() {
    super(UserClient);
  }
}
