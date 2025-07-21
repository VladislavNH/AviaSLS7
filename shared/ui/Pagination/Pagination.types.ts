export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export type PaginationParams = {
  page: number;
  limit?: number;
};
