import { PageNavigation } from '@1k-cove/common';
import styles from './404.module.scss';

const Custom404 = () => {
  return (
    <div className={styles['container']}>
      <PageNavigation backPath="/"></PageNavigation>
      <div className={styles['inner']}>
        <h3>404 - Page Not Found</h3>
      </div>
    </div>
  );
};

export default Custom404;
