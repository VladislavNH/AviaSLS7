import type { DecodedUser } from '@/features/auth/types';
import { decodeUserFromToken } from '@/shared/lib/decodeUserFromToken';
import {
  getToken,
  setToken as saveToken,
  removeToken,
  getRefreshToken,
  setRefreshToken as saveRefreshToken,
  removeRefreshToken,
  clearTokens,
} from '@/shared/lib/token';
import { useEffect, useState, useRef } from 'react';

export const useAuthToken = () => {
  const refreshInProgress = useRef(false);
  const [user, setUser] = useState<DecodedUser | null>(() => {
    const token = getToken();
    return token ? decodeUserFromToken(token) : null;
  });

  const isAuthenticated = !!user;

  const refreshToken = async () => {
    if (refreshInProgress.current) return;
    refreshInProgress.current = true;

    const refresh = getRefreshToken();
    if (!refresh) return;

    try {
      const res = await fetch(
        'http://92.118.114.29:8180/realms/airline-realm/protocol/openid-connect/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: 'airline-project-client',
            refresh_token: refresh,
          }).toString(),
        },
      );

      const data = await res.json();

      if (res.ok && data.access_token && data.refresh_token) {
        saveToken(data.access_token);
        saveRefreshToken(data.refresh_token);
        const decoded = decodeUserFromToken(data.access_token);
        setUser(decoded);
      } else {
        clearTokens();
        setUser(null);
      }
    } catch (e) {
      console.error('Ошибка при обновлении токена', e);
      clearTokens();
      setUser(null);
    } finally {
      refreshInProgress.current = false;
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const decoded = decodeUserFromToken(token);
    const expTime = decoded?.exp ? decoded.exp * 1000 : null;
    if (!expTime) return;

    const timeout = expTime - Date.now() - 10_000;
    if (timeout <= 0) {
      refreshToken();
    } else {
      const timerId = setTimeout(refreshToken, timeout);
      return () => clearTimeout(timerId);
    }
  }, []);

  return {
    getToken,
    setToken: (token: string) => {
      saveToken(token);
      setUser(decodeUserFromToken(token));
    },
    removeToken: () => {
      removeToken();
      setUser(null);
    },
    getRefreshToken,
    setRefreshToken: saveRefreshToken,
    removeRefreshToken,
    user,
    isAuthenticated,
  };
};
