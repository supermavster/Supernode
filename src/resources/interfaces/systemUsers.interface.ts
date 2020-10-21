export interface CRUD {
  fullName: string;
  email: string;
  password: string;
  image: string;
  countryCode: string;
  rolId: number;
}

export interface FOREIGN {
  countryCode?: string;
  rolId?: string;
}

export interface ID {
  suid: string;
}
