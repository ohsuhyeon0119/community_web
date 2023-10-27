import { Outlet } from 'react-router-dom';
import { Nav } from '../components/Nav';
import styles from './ScreenLayout.module.css';
import { Footer } from '../components/Footer';
export function ScreenLayout() {
  return (
    <div className={styles.screenLayout}>
      {/* 좌단의 Nav를 fix한다 */}
      {/* Nav */}
      <div className={styles.navLayout}>
        <Nav></Nav>
      </div>
      {/* main */}
      <div className={styles.mainLayout}>
        <Outlet></Outlet>
      </div>
      {/* Footer */}

      <div className={styles.footerLayout}>
        <Footer></Footer>
      </div>
    </div>
  );
}
