import {PasswordReset} from '../../../models/PasswordReset';
import {Repository} from '../generic';
// export
export class PasswordResetRepository extends Repository {
  constructor() {
    super(PasswordReset);
  }
}