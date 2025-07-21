import type { BaseQueryFn } from '@reduxjs/toolkit/query';

export const baseQueryWithRetry = (baseQuery: BaseQueryFn, maxRetries = 3): BaseQueryFn => {
  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    for (let attempt = 1; attempt <= maxRetries && result.error; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      result = await baseQuery(args, api, extraOptions);
    }

    return result;
  };
};
