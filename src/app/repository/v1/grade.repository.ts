import {Grade} from '../../../models/Grade';
import {Repository} from '../generic';
// export
export class GradeRepository extends Repository {
  constructor() {
    super(Grade);
  }
}
