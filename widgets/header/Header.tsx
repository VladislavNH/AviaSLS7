import styles from './Header.module.scss';
import logo from '@assets/icons/logo.svg';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} to={'/'}>
          <img src={logo} alt="Air Alien" className={styles.logoIcon} />
          <span className={styles.logoText}>Air Alien</span>
        </Link>
        <div className={styles.authButtons}>
          <Link to="/login">
            <Button type="default">Вход</Button>
          </Link>
          <Button type="default">Регистрация</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
