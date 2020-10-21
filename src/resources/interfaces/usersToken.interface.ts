export interface CRUD {
  pushToken?: string;
  version: string;
  authToken: string;
  maxDate: Date;
  updated: boolean;
  uid: string;
  platformId: number;
}

export interface FOREIGN {
  uid: string;
  platformId: number;
}

export interface ID {
  id: number;
}
