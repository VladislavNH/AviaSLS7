import styles from './Footer.module.scss';
import logo from '@assets/icons/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.links}>
          <Link to="#">О нас</Link>
          <Link to="#">Политика конфиденциальности</Link>
          <Link to="#">Связаться с нами</Link>
        </div>
        <div className={styles.brand}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <span className={styles.text}>Air Alien</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
