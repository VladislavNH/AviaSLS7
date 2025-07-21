import { createPhoneNumber } from '../lib/helpers';
import type { Passenger } from './types';

export const DEFAULT_PASSENGERS: Passenger = {
  id: 0,
  firstName: '',
  lastName: '',
  middleName: '',
  gender: '',
  phone: createPhoneNumber(''),
  birthDate: '',
  email: '',
  passport: {
    serialNumber: '',
    issuingDate: '',
    issuingCountry: '',
  },
};
