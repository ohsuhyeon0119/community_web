import { Outlet } from 'react-router-dom';
import { Nav } from '../components/Nav';
import styles from './ScreenLayout.module.css';
export function ScreenLayout() {
  return (
    <div className={styles.screenLayout}>
      {/* 좌단의 Nav를 fix한다 */}

      <div className={styles.navLayout}>
        <Nav></Nav>
      </div>
      {/* 라우팅에 따른 페이지 다르게 렌더링 */}
      <div className={styles.mainLayout}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
