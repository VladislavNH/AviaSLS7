import {
  getToken,
  setToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens,
} from '@/shared/lib/token';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery, type BaseQueryFn } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://92.118.114.29:8180/realms/airline-realm/protocol/openid-connect/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  },
});

function isTokenResponse(data: unknown): data is { access_token: string; refresh_token: string } {
  if (
    typeof data === 'object' &&
    data !== null &&
    'access_token' in data &&
    'refresh_token' in data
  ) {
    const d = data as { access_token?: unknown; refresh_token?: unknown };
    return typeof d.access_token === 'string' && typeof d.refresh_token === 'string';
  }
  return false;
}

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const doRequest = () => baseQuery(args, api, extraOptions);
  let result = await doRequest();

  if (result.error?.status === 401) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return result;

    const refreshResult = await baseQuery(
      {
        url: 'token',
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: 'airline-project-client',
          refresh_token: refreshToken,
        }).toString(),
      },
      api,
      extraOptions,
    );

    if (isTokenResponse(refreshResult.data)) {
      setToken(refreshResult.data.access_token);
      setRefreshToken(refreshResult.data.refresh_token);
      result = await doRequest();
    } else {
      console.warn('Failed to refresh token. Logging out.');
      clearTokens();
    }
  }

  return result;
};
