export interface Passenger {
  id: number;
  fullname: string;
  gender: string;
  phone: phoneNumber;
  birthDate: string;
  serialNumber: string;
  citizenship: string;
  passportIssuingDate: string;
  email: string;
}

export type phoneNumber = string & { __brand: 'phoneNumber' };

export interface PassengerDto {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: phoneNumber;
  email: string;
  passport: {
    middleName: string;
    gender: string;
    serialNumberPassport: string;
    passportIssuingDate: string;
    passportIssuingCountry: string;
  };
}

export interface PassengersResponse {
  content: PassengerDto[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
