import {Request} from 'express';
import {FileArray} from 'express-fileupload';

export interface MulterRequest extends Request {
  body: any;
  files: any;
}

export interface MultiFiles {
  upload?: boolean;
  router?: string;
  files?: FileArray | undefined;
  update?: boolean;
  listAll?: boolean;
  singleFile?: boolean;
  pagination?: boolean;
  recursive?: Array<string>;
  getByTypeItem?: boolean;
  addUrl?: boolean;
  anotherFolder?: boolean;
  onlyFile?: boolean;
}

export interface ID {
  id: number;
}

export interface CRUD {
  name: string;
  image?: string;
}
export interface CRUDImage {
  name: string;
  slug: string;
}
export interface CRUDUpdate {
  id: number;
  name: string;
}

export interface FILTER {
  filter: string;
  limit: number;
  offset: number;
  conditions?: object;
  include?: object;
}

export interface ChangeStatusDTO {
  id: number;
  statusId: number;
}
