import { useState } from 'react';
import { apiURL } from '../App';

export function SignUp() {
  const [username, setUsername] = useState('');

  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  return (
    <>
      <h1>username</h1>
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <h1>id</h1>
      <input
        value={inputId}
        onChange={(e) => {
          setInputId(e.target.value);
        }}
      ></input>
      <h1>password</h1>
      <input
        value={inputPassword}
        onChange={(e) => {
          setInputPassword(e.target.value);
        }}
      ></input>
      <button
        onClick={async () => {
          setUsername('');
          setInputId('');
          setInputPassword('');
          const userData = {
            name: username,
            id: inputId,
            password: inputPassword,
          };
          try {
            const response = await fetch(`${apiURL}/signup`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });

            if (response.ok) {
              console.log('회원가입 성공');
            } else {
              console.error('회원가입 실패');
            }
          } catch (error) {
            console.error('네트워크 오류:', error);
          }
        }}
      >
        회원가입
      </button>
    </>
  );
}
