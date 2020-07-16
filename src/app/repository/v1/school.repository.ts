import {School} from '../../../models/School';
import {Repository} from '../generic';
// export
export class SchoolRepository extends Repository {
  constructor() {
    super(School);
  }
}