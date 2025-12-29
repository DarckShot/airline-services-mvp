import styles from './Header.module.css';
import { memo } from 'react';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Дополнительные услуги</h1>
      <p className={styles.subtitle}>Сделайте ваш полёт ещё комфортнее</p>
    </header>
  );
};

export default memo(Header);
