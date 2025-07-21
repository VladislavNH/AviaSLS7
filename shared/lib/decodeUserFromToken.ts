import type { JwtPayload, DecodedUser } from '@/features/auth/types';
import { jwtDecode } from 'jwt-decode';

export const decodeUserFromToken = (token: string): DecodedUser | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return {
      username: decoded.preferred_username,
      roles: decoded.realm_access?.roles || [],
      exp: decoded.exp,
    };
  } catch {
    return null;
  }
};
