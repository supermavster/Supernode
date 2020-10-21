export interface FILTER {
  filter: string;
  limit: number;
  offset: number;
  search?: string;
}

export interface ID {
  id: number;
}

export interface AddAddress {
  id?: number;
  suid: string;
  address: string;
  supplement: string;
  name: string;
  longitude: string;
  latitude: string;
  defaultAddress: string;
}

export interface UpdateProfile {
  phone: string;
  suid: string;
  fullName: string;
  typeId: string;
  idNumber: string;
}

export interface UpdateProfilePhoto {
  suid: string;
  slug: string;
}

export interface RemoveAddress {
  userAddressId: number;
}

export interface AddMethodPayment {
  token: string;
  franchise: string;
  last: number;
  suid: string;
  gatewayId: number;
}
