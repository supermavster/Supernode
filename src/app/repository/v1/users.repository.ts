import {FranchiseUsers} from '../../models/FranchiseUsers';
import {SystemUsers} from '../../models/SystemUsers';
import {Repository} from '../generic';
// export
export class UsersRepository extends Repository {
  findStudentBySUID = async (suid: string) => {
    const response = await this.one({
      where: {suid}
    });
    return response;
  };

  findBySUID = async (suid: string) => {
    const response = await this.singleCondition({suid});
    return response;
  };

  findByEmail = async (email: string) => {
    const response = await this.singleCondition({email});
    return response;
  };

  createClient = (data?: Object): Promise<any> => {
    return this.create(data);
  };

  // Status
  changeCheckUserSUID = async (
    suid: string,
    checkUserId: number,
    status = 'active'
  ) => {
    await this.update({checkUserId, status}, {suid});
  };

  constructor() {
    super();
    this.setModel(SystemUsers);
  }
}
