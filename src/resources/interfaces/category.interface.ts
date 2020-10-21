export interface FILTER {
  filter: string;
  limit: number;
  offset: number;
  conditions?: object;
  include?: object;
  categoryId: number;
}

export interface ChangeStatusDTO {
  id: number;
  statusId: number;
}

export interface CRUD {
  name: string;
  color: string;
  image?: string;
  slug?: string;
}
