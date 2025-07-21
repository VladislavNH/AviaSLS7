import { sanitazeStringParam, validateNumericParam } from './sanitize';

export type paramsType = {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
};

export const paramsConfigurer = (url: string, params?: paramsType) => {
  if (params) {
    const query = new URLSearchParams();

    const page = validateNumericParam(params.page);
    if (page !== null) {
      query.append('page', page.toString());
    }

    const pageSize = validateNumericParam(params.pageSize);
    if (pageSize !== null && pageSize <= 100) {
      query.append('size', pageSize.toString());
    }

    if (params.sortField) {
      const sanitizedField = sanitazeStringParam(params.sortField);
      const order = params.sortOrder === 'desc' ? 'desc' : 'asc';
      if (sanitizedField) {
        query.append('sort', `${sanitizedField}, ${order}`);
      }
    }

    if (Array.from(query).length > 0) {
      url += `?${query}`;
    }
  }

  return url;
};
