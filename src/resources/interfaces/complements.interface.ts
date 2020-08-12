import {Request} from 'express';

export interface MulterRequest extends Request {
  body: any;
  files: any;
}

export interface ID {
  id: number;
}

export interface CRUD {
  name: string;
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
}
