import Router from 'next/router';
import styles from './PageNavigation.module.css';

type PageNavigationProps = {
  backPath?: string;
};

export const PageNavigation: React.FC<PageNavigationProps> = (props) => {
  return (
    <nav className={styles['nav']}>
      <ul className={styles['list']}>
        <li className={styles['list-item']}>
          <button
            onClick={() => {
              if (props.backPath) {
                Router.push(props.backPath);
                return;
              }
              Router.back();
            }}
            className={styles['back-button']}
          >
            Back
          </button>
        </li>
      </ul>
    </nav>
  );
};
