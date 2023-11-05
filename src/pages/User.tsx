import { RootState } from '../module';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiURL } from '../App';
import { setLogout } from '../module/loginstate';
import { useEffect } from 'react';
import axios from 'axios';
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
      return axios
        .get(apiURL + '/user', { headers: { Authorization: token } })
        .then((res) => {
          return res.data;
        });
    },
    enabled: isLoggedIn, //로그인 된 경우에만 쿼리 실행
  });

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
    <>
      {userQuery.data ? (
        <div>
          <p>{userQuery.data.username}</p>
          <p>{userQuery.data.id}</p>
          <button
            onClick={() => {
              onLogout();
              location.href = '/';
            }}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </>
  );
}
