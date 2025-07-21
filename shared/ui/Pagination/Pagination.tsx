import classes from './Pagination.module.scss';
import type { PaginationProps } from './Pagination.types';
import { PAGINATION_CONFIG } from '@shared/config/config';
import { useEffect, useState } from 'react';

const Pagination = ({
  totalItems = PAGINATION_CONFIG.DEFAULTS.total,
  itemsPerPage = PAGINATION_CONFIG.DEFAULTS.pageSize,
  currentPage = PAGINATION_CONFIG.DEFAULTS.page,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) => {
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const [visiblePages, setVisiblePage] = useState<number[]>([]);
  const Lt = () => {
    return (
      <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.49701 10.4959C6.36446 10.4959 6.23053 10.4521 6.1187 10.3646L0.267188 5.70389C0.124973 5.59042 0.0421295 5.41952 0.0421295 5.23768C0.0421295 5.05721 0.124973 4.88495 0.267188 4.77284L6.09384 0.136706C6.35342 -0.0697388 6.73312 -0.0287232 6.94161 0.228308C7.1501 0.485339 7.10867 0.861316 6.8491 1.06776L1.60787 5.23768L6.87533 9.43358C7.13491 9.64003 7.17633 10.016 6.96784 10.273C6.84772 10.4193 6.67375 10.4959 6.49701 10.4959Z"
          fill="black"
          fillOpacity="0.75"
        />
      </svg>
    );
  };
  const Gt = () => {
    return (
      <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.50559 10C1.63834 10 1.77247 9.9583 1.88448 9.87489L7.7449 5.43216C7.88733 5.324 7.9703 5.16109 7.9703 4.98776C7.9703 4.81573 7.88733 4.65153 7.7449 4.54466L1.90937 0.125395C1.6494 -0.0713929 1.26913 -0.0322959 1.06032 0.212712C0.851513 0.45772 0.892998 0.81611 1.15297 1.0129L6.40217 4.98776L1.1267 8.98739C0.866724 9.18418 0.825239 9.54256 1.03405 9.78757C1.15435 9.92702 1.32859 10 1.50559 10Z"
          fill="black"
          fillOpacity="0.75"
        />
      </svg>
    );
  };

  useEffect(() => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    setVisiblePage(Array.from({ length: end - start + 1 }, (_, i) => start + i));
  }, [currentPage, totalPages, maxVisiblePages]);

  if (totalPages <= 1) return null;

  return (
    <nav className={classes.pagination} aria-label="Pagination Navigation" role="navigation">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={classes.paginationButton}
        aria-label="Go to first page"
      >
        <Lt />
        <Lt />
      </button>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={classes.paginationButton}
        aria-label="Go to previous page"
      >
        <Lt />
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            aria-current={1 === currentPage ? 'page' : undefined}
            className={`${classes.paginationButton} ${1 === currentPage ? classes.active : ''}`}
          >
            1
          </button>

          {visiblePages[0] > 2 && <span className={classes.paginationEllipsis}>...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          aria-label={`Go to page ${String(page)}`}
          aria-current={page === currentPage ? 'page' : undefined}
          key={page}
          onClick={() => onPageChange(page)}
          className={`${classes.paginationButton} ${page === currentPage ? classes.active : ''}`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className={classes.paginationEllipsis}>..</span>
          )}
          <button
            aria-label={`Go to page ${totalPages}`}
            aria-current={totalPages === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(totalPages)}
            className={`${classes.paginationButton} ${totalPages === currentPage ? classes.active : ''}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => {
          onPageChange(Math.min(totalPages, currentPage + 1));
        }}
        disabled={currentPage === totalPages}
        className={classes.paginationButton}
        aria-label="Go to next page"
      >
        <Gt />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={classes.paginationButton}
        aria-label="Go to last page"
      >
        <Gt />
        <Gt />
      </button>
    </nav>
  );
};

export default Pagination;
