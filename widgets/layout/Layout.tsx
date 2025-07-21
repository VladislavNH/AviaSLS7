import styles from './Layout.module.scss';
import Footer from '@widgets/footer/Footer';
import Header from '@widgets/header/Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
