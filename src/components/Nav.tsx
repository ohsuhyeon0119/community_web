import { AiOutlineHome } from 'react-icons/ai';
import { AiFillHome } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { BsChatLeftText } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { BiSolidUser } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../pages/ScreenLayout.module.css';
export function Nav() {
  const location = useLocation();
  // 현재 주소값을 받아와 stlye을 변경
  const navigate = useNavigate();
  // 클릭 시 해당 페이지로 이동
  const nav = location.pathname.split('/')[1];

  return (
    <IconContext.Provider value={{ size: '50px' }}>
      <div className={styles.Nav}>
        <div
          onClick={() => {
            navigate('/');
          }}
          className={styles.navButton + ' ' + styles.homeContainer}
        >
          {nav === '' ? (
            <AiFillHome></AiFillHome>
          ) : (
            <AiOutlineHome></AiOutlineHome>
          )}
        </div>
        <div
          onClick={() => {
            navigate('/boards');
          }}
          className={styles.navButton + ' ' + styles.boardsContainer}
        >
          {nav === 'boards' ? (
            <BsChatLeftTextFill></BsChatLeftTextFill>
          ) : (
            <BsChatLeftText></BsChatLeftText>
          )}
        </div>
        <div
          onClick={() => {
            navigate('/user');
          }}
          className={styles.navButton + ' ' + styles.userContainer}
        >
          {nav === 'user' ? <BiSolidUser></BiSolidUser> : <BiUser></BiUser>}
        </div>
      </div>
    </IconContext.Provider>
  );
}
