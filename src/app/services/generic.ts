import config from '../../config';
import {IComplements} from '../../resources/interfaces';
import {isEmpty} from '../../utils/FormatData';
import {Repository} from '../repository/generic';

// Language
const language = `../../resources/lang/${config.LANGUAGE}`;
const lang = require(language);

export const GeneralServiceResponse = (data: any, message: string = '') => {
  if (isEmpty(data)) {
    return {
      status: false,
      message: message.length === 0 ? lang.STACK.ERROR : message
    };
  }
  return {
    status: true,
    data,
    message: message.length === 0 ? lang.STACK.SUCCESS : message
  };
};

export class Service {
  all = async () => {
    // @ts-ignore
    const data = await this.repository.allActive();
    return GeneralServiceResponse(data);
  };

  contentPagination = async (filter: IComplements.FILTER) => {
    // @ts-ignore
    const data: any = await this.repository.contentPagination(filter);
    // Check if Exist
    // const check = !(await this.repository.isEmpty(data));
    return GeneralServiceResponse(data);
  };

  index = async (request: IComplements.ID) => {
    const id: number = request.id;
    // @ts-ignore
    const data = await this.repository.singleCondition({id});
    return GeneralServiceResponse(data);
  };

  getFiles = async (request: IComplements.ID, files = ['image']) => {
    const id: number = request.id;
    // @ts-ignore
    const data = await this.repository.getFiles({id}, files);
    return GeneralServiceResponse(data);
  };

  remove = async (request: IComplements.ID) => {
    const id: number = request.id;
    // @ts-ignore
    const data = await this.repository.destroy({id});
    return GeneralServiceResponse(data);
  };

  create = async (request: IComplements.CRUD, router: string = '') => {
    // eslint-disable-next-line no-warning-comments
    // TODO: ADD Identification SLUG
    // request.slug = router + sha1(request.name + new Date().getMilliseconds()).toString();
    // @ts-ignore
    const data = await this.repository.create(request);
    // ID
    data.dataValues.id = data.null;
    return GeneralServiceResponse(data);
  };

  update = async (key: IComplements.ID, request: IComplements.CRUD) => {
    const id: number = key.id;
    // @ts-ignore
    const data = await this.repository.update(request, {id});
    return GeneralServiceResponse(data);
  };

  deactivate = async (id: any) => {
    // @ts-ignore
    const data = await this.repository.deactivate({id});
    return GeneralServiceResponse(data);
  };

  changeStatus = async (request: IComplements.ChangeStatusDTO) => {
    const id: number = request.id;
    // @ts-ignore
    const data = await this.repository.update(request, {id});
    return GeneralServiceResponse(data);
  };

  repository: Repository;
  // repository: any;

  public setRepository(data: Repository) {
    this.repository = data;
  }
}
