import { RootState } from '../module';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import { setLogout } from '../module/loginstate';
import { useEffect } from 'react';
import { getUser } from '../api/api';

import styled from 'styled-components';

const StyledUserWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .member-profile {
    border: 0.1px solid #ccc;
    padding: 20px;

    width: 30rem;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .profile-image {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
  }

  .profile-info {
    font-size: 18px;
    margin: 20px 0;
  }

  .profile-info p {
    margin: 5px 0;
  }

  .profile-buttons {
    display: flex;
    justify-content: space-around;
  }

  .button {
    background-color: #dddddd;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .button:hover {
    background-color: #aca4a4;
  }
  .logout {
    margin-top: 2rem;
    width: 100%;
  }
`;

export default function User() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const token = useSelector(
    (state: RootState) => state.loginStateReducer.token
  );

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      // 이제 모든 요청마다 header에 token을 넣어야 함
      return getUser(token as string);
    },
    enabled: isLoggedIn, //로그인 된 경우에만 쿼리 실행
  });
  const user = userQuery.data;

  function onLogout() {
    dispatch(setLogout());
  }
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      // 로딩 문제 때문에 직접 로컬 스토리지를 확인해야 한다.
      navi('/login');
    }
  }, []);

  return (
    <StyledUserWrapper>
      {!!user && (
        <>
          <div className="member-profile">
            <img
              className="profile-image"
              src="data:image/jpeg;base64,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"
              alt="프로필 이미지"
            />

            <div className="profile-info">
              <p>닉네임 {user.username}</p>
              <p>아이디 {user.id}</p>
            </div>

            <div className="profile-buttons">
              <button className="button" id="my-posts-button">
                내가 쓴 글
              </button>
              <button className="button" id="my-comments-button">
                내가 단 댓글
              </button>
              <button className="button" id="my-likes-button">
                내가 좋아요한 글
              </button>
            </div>
            <div>
              <button
                className="button logout"
                onClick={() => {
                  onLogout();
                  navi('/');
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </>
      )}
    </StyledUserWrapper>
  );
}
