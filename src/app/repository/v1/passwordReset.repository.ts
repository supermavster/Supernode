import {SystemPasswordReset} from '../../models/SystemPasswordReset';
import {Repository} from '../generic';
// export
export class PasswordResetRepository extends Repository {
  constructor() {
    super();
    this.setModel(SystemPasswordReset);
  }
}
