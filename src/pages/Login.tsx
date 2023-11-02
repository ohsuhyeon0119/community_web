import axios from 'axios';
import { apiURL } from '../App';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { init, setLogin, setLogout } from './../module/loginstate';
import { RootState } from './../module';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navi = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const token = useSelector(
    (state: RootState) => state.loginStateReducer.token
  );
  const dispatch = useDispatch();
  function onInit() {
    // 로컬 스토리지의 만료 여부 확인
    dispatch(init());
  }
  function onLogin(token: string) {
    dispatch(setLogin(token));
  }
  function onLogout() {
    dispatch(setLogout());
  }

  const loginMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${apiURL}/login`, data).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (!data.token) {
        alert(data.message);
      } else {
        console.log('login success', data.token);
        onLogin(data.token);
        location.href = '/';
      }
    },
  });

  return (
    <div>
      <h1>로그인</h1>
      <label htmlFor="id">사용자 아이디</label>
      <input
        id="id"
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button
        onClick={() => {
          const data = { id, password };

          loginMutation.mutate(data);
        }}
      >
        로그인 버튼
      </button>
    </div>
  );
}
