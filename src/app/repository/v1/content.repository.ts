import {Content} from '../../../models/Content';
import {Repository} from '../generic';
// export
export class ContentRepository extends Repository {
  constructor() {
    super(Content);
  }
}
