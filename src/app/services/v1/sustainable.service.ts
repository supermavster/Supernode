import sha1 from 'crypto-js/sha1';

import config from '../../../config';
import {SustainableRepository} from '../../repository';
import {IComplements} from '../../../resources/interfaces';
// Language
const language = `../../../resources/lang/${config.LANGUAGE}`;
const lang = require(language);

export class SustainableService {
  sustainableRepository: SustainableRepository = new SustainableRepository();

  all = async () => {
    const data = await this.sustainableRepository.all();
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

  index = async (request: IComplements.ID) => {
    const id: number = request.id;
    const data = await this.sustainableRepository.index({id});
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
    const data = await this.sustainableRepository.destroy({id});
    return {
      status: true,
      data,
      message: lang.STACK.CRUD.DESTROY
    };
  };

  create = async (request: IComplements.CRUDImage) => {
    request.slug = sha1(request.name.toString().trim()).toString();
    const data = await this.sustainableRepository.create(request);
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

  update = async (key: IComplements.ID, request: IComplements.CRUDImage) => {
    const id: number = key.id;
    request.slug = sha1(request.name.toString().trim()).toString();
    const data = await this.sustainableRepository.update(request, {id});
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
}
