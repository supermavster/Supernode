export interface SigInDTO {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  photo: string;
  authToken: string;
}
export interface SignUpDTO {
  uid: string;
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  slug: string;
  password: string;
  status: string;
  checkUserId: number | undefined;
}

export interface SignInDTO {
  email: string;
  password: string;
  uid: string | undefined;
  platformId: number;
  version: string;
  pushToken: string | undefined;
}

export interface AuthTokenDTO {
  uid: string | undefined;
  platformId: number;
  version: string;
  pushToken: string | undefined;
}

export interface AuthDTO {
  platformId: number;
  version: string;
  pushToken: string | undefined;
  authToken: string;
  maxDate: Date;
  updated: boolean;
  uid: string | undefined;
}

export interface RecoveryDTO {
  code: number;
  password: string;
}
