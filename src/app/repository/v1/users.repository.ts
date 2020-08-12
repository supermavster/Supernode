import {Users} from '../../models/Users';
import {Repository} from '../generic';
import {UserClient} from '../../models/UserClient';
// export
export class UsersRepository extends Repository {
  findStudentByUID = async (uid: string) => {
    const response = await this.one({where: {uid}, include: [UserClient]});
    return response;
  };

  findByUID = async (uid: string) => {
    const response = await this.singleCondition({uid});
    return response;
  };

  findByEmail = async (email: string) => {
    const response = await this.singleCondition({email});
    return response;
  };

  createClient = (data?: Object): Promise<any> => {
    return UserClient.create(data);
  };

  // Status
  changeCheckUserUID = async (
    uid: string,
    checkUserId: number,
    status = 'active'
  ) => {
    await this.update({checkUserId, status}, {uid});
  };

  constructor() {
    super();
    this.setModel(Users);
  }
}
