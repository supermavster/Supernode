import {Repository} from '../generic';
import {Cat} from '../../models/Cat';
// export
export class CatRepository extends Repository {
  allActive = async () => {
    const reponse = await this.all({
      where: {status: 'active'}
    });
    return reponse;
  };

  constructor() {
    super();
    this.setModel(Cat);
  }
}
