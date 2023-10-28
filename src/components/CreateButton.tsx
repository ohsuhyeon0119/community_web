import { IoIosCreate } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { IoCreateOutline } from 'react-icons/io5';

import styles from '../pages/ScreenLayout.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

export function CreateButton() {
  const location = useLocation();
  const nav = location.pathname.split('/')[1];
  // 버튼의 display 가 선택적으로 none;

  const navi = useNavigate();
  return (
    <>
      {/* 특정 페이지에서만 보여지게, 나중에는 로그인에 대한 조건부*/}
      {nav === '' || nav === 'thread' ? (
        <IconContext.Provider value={{ size: '30px' }}>
          <div
            onClick={() => {
              navi('/create');
            }}
            className={styles.createButton}
          >
            <IoCreateOutline></IoCreateOutline>
          </div>
        </IconContext.Provider>
      ) : (
        <></>
      )}
    </>
  );
}
