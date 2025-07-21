import type { phoneNumber } from '../model/types';

// Валидацию закомментил т.к. с бэка приходит не номер, а ерунда
// export const createPhoneNumber = (value: string): phoneNumber => {
//   if (!/^\+?[1-9]\d{1,14}$/.test(value.replace(/[\s()-]/g, ''))) {
//     throw new Error('Invalid phone number format');
//   }
//   return value as phoneNumber;
// };

export const createPhoneNumber = (value: string): phoneNumber => value as phoneNumber;
