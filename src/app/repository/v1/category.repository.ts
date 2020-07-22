import {Category} from '../../../models/Category';
import {Repository} from '../generic';
// export
export class CategoryRepository extends Repository {
  constructor() {
    super(Category);
  }
}
