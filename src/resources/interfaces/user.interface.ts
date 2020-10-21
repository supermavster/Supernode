export interface SigInDTO {
  suid: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  photo: string;
  authToken: string;
  social?: string;
  docTypeId: number;
  countryCodeId: string;
  cityId: number;
}
export interface SignUpDTO {
  suid: string;
  name: string;
  // lastName: string;
  fullName: string;
  email: string;
  phone: string;
  slug: string;
  password: string;
  status: string;
  social?: string;
  docTypeId: number;
  countryCodeId: string;
  cityId: number;
  checkUserId: number | undefined;
}

export interface SignInDTO {
  email: string;
  password: string;
  suid: string | undefined;
  platformId: number;
  version: string;
  pushToken: string | undefined;
}

export interface AuthTokenDTO {
  suid: string | undefined;
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
  suid: string | undefined;
}

export interface RecoveryDTO {
  code: number;
  password: string;
}
