import { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode[];
};
const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
