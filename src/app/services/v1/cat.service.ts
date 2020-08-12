import config from '../../../config';
import {CatRepository} from '../../repository';
import {IComplements, ICat} from '../../../resources/interfaces';
// Language
const language = `../../../resources/lang/${config.LANGUAGE}`;
const lang = require(language);

export class CatService {
  catRepository: CatRepository = new CatRepository();

  all = async () => {
    const data = await this.catRepository.allActive();
    // Check if Exist
    if (typeof data === 'undefined' || !data || data === null) {
      return {
        status: false,
        message: lang.STACK.CRUD.ERROR.EMPTY
      };
    }

    return {
      status: true,
      data,
      message: lang.STACK.CRUD.SUCCESS
    };
  };

  contentPagination = async (filter: ICat.FILTER) => {
    const data: any = await this.catRepository.contentPagination(filter);
    // Check if Exist
    if (this.catRepository.isEmpty(data.data)) {
      return {
        status: false,
        message: lang.STACK.CRUD.ERROR.EMPTY
      };
    }

    return {
      status: true,
      data,
      message: lang.STACK.CRUD.SUCCESS
    };
  };

  index = async (request: IComplements.ID) => {
    const id: number = request.id;
    const data = await this.catRepository.singleCondition({id});
    // Check if Exist
    if (typeof data === 'undefined' || !data) {
      return {
        status: false,
        message: lang.STACK.CRUD.ERROR.EMPTY
      };
    }
    return {
      status: true,
      data,
      message: lang.STACK.CRUD.SUCCESS
    };
  };

  remove = async (request: IComplements.ID) => {
    const id: number = request.id;
    const data = await this.catRepository.destroy({id});
    return {
      status: true,
      data,
      message: lang.STACK.CRUD.DESTROY
    };
  };

  create = async (request: IComplements.CRUD) => {
    const data = await this.catRepository.create(request);
    if (typeof data === 'undefined' || !data || data === null) {
      return {
        status: false,
        message: lang.STACK.CRUD.ERROR.MAKE
      };
    }
    return {
      status: true,
      data: request,
      message: lang.STACK.CRUD.MAKE
    };
  };

  update = async (key: IComplements.ID, request: IComplements.CRUD) => {
    const id: number = key.id;
    const data = await this.catRepository.update(request, {id});

    if (typeof data === 'undefined' || !data) {
      return {
        status: false,
        message: lang.STACK.CRUD.ERROR.MAKE
      };
    }
    return {
      status: true,
      data: request,
      message: lang.STACK.CRUD.MAKE
    };
  };

  deactivate = async (id: any) => {
    const data = await this.catRepository.deactivate({id});
    if (typeof data === 'undefined' || !data || data === null) {
      return {
        status: false,
        message: lang.STACK.CRUD.ERROR.DEACTIVATE
      };
    }
    return {
      status: true,
      data,
      message: lang.STACK.CRUD.DEACTIVATE
    };
  };
}
