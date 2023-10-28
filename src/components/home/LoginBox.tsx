import styles from './../../pages/Home.module.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// 로그인 페이지는 대문에서만 관리

// 재사용 할 수 있도록 styled-component 사용

const StyledButton = styled.button`
  width: 200px;
  height: 50px;
  backgroud-color: #000;
  border-radius: 10px;
`;

export function LoginBox() {
  const navi = useNavigate();
  return (
    <>
      <div className={styles.LoginBox}>
        <div
          onClick={() => {
            navi('/login');
          }}
          className={styles.loginButton}
        >
          <span>LOGIN</span>
        </div>
        <div
          onClick={() => {
            navi('/signup'); // modal로 구현하기
          }}
          className={styles.signupButton}
        >
          <span>SIGN UP</span>
        </div>
      </div>
    </>
  );
}
