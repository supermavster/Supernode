import {Sustainable} from '../../../models/Sustainable';
import {Repository} from '../generic';
// export
export class SustainableRepository extends Repository {
  constructor() {
    super(Sustainable);
  }
}
