import type { LoginRequest, TokenResponse } from '../types';
import { baseQueryWithReauth } from '@/shared/lib/baseQueryWithReauth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loginUser: builder.mutation<TokenResponse, LoginRequest>({
      query: ({ username, password }) => {
        const body = new URLSearchParams();
        body.append('grant_type', 'password');
        body.append('client_id', 'airline-project-client');
        body.append('username', username);
        body.append('password', password);

        return {
          url: 'token',
          method: 'POST',
          body: body.toString(),
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
