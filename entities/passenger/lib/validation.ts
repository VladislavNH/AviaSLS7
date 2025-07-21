import type { PassengersResponse, PassengerDto } from '../model/types';

export const validatePassengersResponse = (data: unknown): PassengersResponse => {
  if (!data || typeof data !== 'object') throw new Error('Invalid Response Format');

  const response = data as Record<string, unknown>;

  if (!Array.isArray(response.content)) throw new Error('Missing content array');
  if (typeof response.totalElements !== 'number') throw new Error('Missing totalElements');
  if (typeof response.totalPages !== 'number') throw new Error('Missing totalPages');
  if (typeof response.number !== 'number') throw new Error('Missing number');
  if (typeof response.size !== 'number') throw new Error('Missing size');

  return response as unknown as PassengersResponse;
};
export const validatePassenger = (data: unknown): PassengerDto => {
  if (!data || typeof data !== 'object') throw new Error('Invalid passenger data');

  const passenger = data as Record<string, unknown>;
  const required = ['id', 'firstName', 'lastName', 'email', 'passport'];

  for (const field of required) {
    if (!(field in passenger)) throw new Error(`Missing required field: ${field}`);
  }

  return passenger as unknown as PassengerDto;
};
