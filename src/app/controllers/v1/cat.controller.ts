import {CatService} from '../../services';
import {Controller} from '../generic';

export class CategoryController extends Controller {
  // Config
  getRouterFile = () => {
    return 'cat';
  };

  constructor() {
    super();
    this.setService(new CatService());
  }
}
