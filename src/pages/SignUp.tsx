import axios from 'axios';
import { apiURL } from '../App';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { styled } from 'styled-components';
import { setLogin } from '../module/loginstate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const StlyedSignupBoxWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  box-sizing: border-box;
  width: 40rem;
  height: 40rem;
  padding: 1rem;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  input {
    width: 50%;
    height: 2.5rem;
    border: 1px solid gray;
    border-radius: 15px;
    text-align: left;
    padding-left: 1rem;
  }
  input + input {
    margin-top: 1rem;
  }
  input:focus {
    border: 2px solid #ff3399;
  }
  .errormsg {
    height: 2rem;
    color: red;
    font-weight: 800;
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
    font-weight : 800;
    background-color: 
    border-radius: 5px;
    border: none;
    background-color: #ff3399;
    cursor: pointer;
  }
`;

export function SignUp() {
  const [username, setUsername] = useState('');
  const navi = useNavigate();
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const loginMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${apiURL}/login`, data).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (!data.token) {
        setErrorMsg(data.message);
      } else {
        console.log('login success', data.token);
        onLogin(data.token);
        navi(-1);
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${apiURL}/signup`, data).then((res) => res.data);
    },
    onSuccess: (data) => {
      alert('회원가입 성공');
      navi('/login');
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  function onLogin(token: string) {
    dispatch(setLogin(token));
  }

  return (
    <>
      <StlyedSignupBoxWrapper>
        <Box>
          <h1>SIGN UP!</h1>
          <hr />
          <h1>회원 가입</h1>
          <h1>username</h1>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="username을 입력하세요"
          ></input>
          <h1>id</h1>
          <input
            value={inputId}
            onChange={(e) => {
              setInputId(e.target.value);
            }}
            placeholder="id를 입력하세요"
          ></input>
          <h1>password</h1>
          <input
            value={inputPassword}
            placeholder="비밀번호를 입력하세요"
            type="password"
            onChange={(e) => {
              setInputPassword(e.target.value);
            }}
          ></input>
          <ButtonBox>
            <button
              onClick={async () => {
                setUsername('');
                setInputId('');
                setInputPassword('');
                const userData = {
                  username: username,
                  id: inputId,
                  password: inputPassword,
                };
                signupMutation.mutate(userData);
              }}
            >
              회원가입
            </button>
          </ButtonBox>
          <p className="errormsg">{errorMsg}</p>
        </Box>
      </StlyedSignupBoxWrapper>
    </>
  );
}
