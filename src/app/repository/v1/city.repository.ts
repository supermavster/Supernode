import {City} from '../../../models/City';
import {Repository} from '../generic';
// export
export class CityRepository extends Repository {
  constructor() {
    super(City);
  }
}
