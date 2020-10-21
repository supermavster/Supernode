import {Repository} from '../generic';
import {Cat} from '../../models/Cat';
import {IComplements, ICategory} from '../../../resources/interfaces';
// export
export class CatRepository extends Repository {
  model = Cat;
  constructor() {
    super();
    this.setModel(this.model);
  }
}
