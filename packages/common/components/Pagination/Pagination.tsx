import React from 'react';
import Link from 'next/link';
import styles from './Pagination.module.css';
type PaginationProps = {
  path: string;
  page: number;
  totalCount: number;
};

export const Pagination: React.FC<PaginationProps> = (props) => {
  const pages = Array.from(Array(props.totalCount).keys()).map((p) => {
    return p + 1;
  });

  const getLinkStyles = (i: number) => {
    return i == props.page
      ? `${styles.link} ${styles['--active']}`
      : styles.link;
  };
  return (
    <div className={styles.pagination}>
      {pages.map((i) => {
        return (
          <Link
            href={`${props.path}/${i}`}
            key={`link-${i}`}
            className={getLinkStyles(i)}
          >
            {i}
          </Link>
        );
      })}
    </div>
  );
};
