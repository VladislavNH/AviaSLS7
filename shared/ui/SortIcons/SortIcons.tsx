import styles from './SortIcons.module.scss';
import type { SortDirection } from './SortIcons.types';
import { useEffect, useState } from 'react';

export const SortIcon = ({
  sortConfig,
  columnKey,
}: {
  sortConfig: { key: string; direction: SortDirection } | null;
  columnKey: string;
}) => {
  const [isActiveAsc, setIsActive] = useState(false);
  const [isActiveDesc, setIsDective] = useState(false);

  useEffect(() => {
    if (sortConfig?.direction === 'asc') {
      setIsActive(true);
      setIsDective(false);
    }
    if (sortConfig?.direction === 'desc') {
      setIsDective(true);
      setIsActive(false);
    }
  }, [sortConfig?.direction, columnKey]);

  return (
    <>
      <svg
        aria-labelledby="title asc"
        data-testid={'sort-icon-asc'}
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        className={`${styles.sortIcon} ${
          sortConfig?.key === columnKey && isActiveAsc ? styles.active : ''
        }`}
      >
        <title id="title">Sort ascension</title>
        <desc id="asc">Sort ascension column</desc>
        <path d="M5 0L9.33013 5.25H0.669873L5 0Z" fill="currentColor" />
      </svg>

      <svg
        aria-labelledby="title desc"
        data-testid={'sort-icon-desc'}
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        className={`${styles.sortIcon} ${
          sortConfig?.key === columnKey && isActiveDesc ? styles.active : ''
        }`}
      >
        <title id="title">Sort descension</title>
        <desc id="desc">Sort descension column</desc>
        <path d="M5 6L0.669873 0.75H9.33013L5 6Z" fill="currentColor" />
      </svg>
    </>
  );
};
