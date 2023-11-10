import axios from 'axios';
import { apiURL } from '../App';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setLogin } from './../module/loginstate';

import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const StlyedLoginBoxWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  box-sizing: border-box;
  width: 40rem;
  height: 35rem;
  padding: 1rem;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 50%;
    height: 2rem;
    border: 1px solid gray;

    border-radius: 15px;
    text-align: left;
    padding-left: 1rem;
  }
  input:focus {
    border: 2px solid #ff3399;
  }
  input + input {
    margin-top: 1rem;
  }
  .forgotten {
    color: gray;
    margin: 30px;
    font-size: 12px;
  }
  .errormsg {
    height: 2rem;
    color: red;
    font-weight: 800;
  }
  .forgotten:hover {
    color: red;
    font-weight: 800;
    cursor: pointer;
  }
  hr {
    border: 1px solid gray;
    width: 100%;
    margin-bottom: 25px;
  }
  @media (max-width: 768px) {
    width: 90%;
    input {
      width: 100%;
    }
  }
`;

const ButtonBox = styled.div`
  margin-top: 30px;
  Button {
    width: 4rem;
    height: 2rem;
    font-size: 12px;
  }
  button {
    border-radius: 15px;
    font-weight: 800;

    border-radius: 5px;
    border: none;
    background-color: #ff3399;
    cursor: pointer;
  }
`;

export function Login() {
  const navi = useNavigate();
  const { state } = useLocation(); // usenavigate로 저장한 pathname은 uselocation에서 가져온다
  // state가 존재하면 login페이지로 이동했을때 이전 페이지가 이 웹사이트의 페이지임을 의미한다.
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  function onLogin(token: string) {
    dispatch(setLogin(token));
  }

  const loginMutation = useMutation({
    mutationFn: (data: { id: string; password: string }) => {
      return axios.post(`${apiURL}/login`, data).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (!data.token) {
        setErrorMsg(data.message);
      } else {
        console.log('login success', data.token);
        onLogin(data.token);
        if (!!state.pathname) {
          console.log('state', state);
          if (state.pathname === '/signup') {
            // 회원가입 페이지에서 로그인했을때에는 home으로 리다이렉트를 시킨다.
            return navi('/');
          }
          navi('/user');
        } else {
          navi('/user');
        }
      }
    },
  });

  return (
    <StlyedLoginBoxWrapper>
      <Box>
        <h1>LOGIN</h1>
        <hr />
        <h1>로그인</h1>

        <input
          id="id"
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setErrorMsg('');
          }}
          placeholder="아이디를 입력해주세요."
        />

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg('');
          }}
          placeholder="비밀번호 입력해주세요."
        />
        <ButtonBox>
          <button
            onClick={() => {
              const data = { id, password };

              loginMutation.mutate(data);
            }}
          >
            확인
          </button>
        </ButtonBox>
        <p className="errormsg">{errorMsg}</p>
        <p className="forgotten">아이디 또는 비밀번호를 잊어버리셨나요?</p>
      </Box>
    </StlyedLoginBoxWrapper>
  );
}
