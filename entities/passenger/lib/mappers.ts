import { createPhoneNumber } from '../lib/helpers';
import type { Passenger, PassengerDto } from '../model/types';

export const mapDtoToPassengers = (dto: PassengerDto): Passenger => ({
  id: dto.id,
  fullname: getFullName(dto),
  gender: dto.passport.gender,
  phone: createPhoneNumber(dto.phoneNumber),
  birthDate: dto.birthDate,
  serialNumber: dto.passport.serialNumberPassport,
  citizenship: dto.passport.passportIssuingCountry,
  passportIssuingDate: dto.passport.passportIssuingDate,
  email: dto.email,
});

export const getFullName = (passenger: PassengerDto): string => {
  return `${passenger.lastName} ${passenger.firstName} ${passenger.passport.middleName}`.trim();
};
