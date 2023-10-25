import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Thread } from './pages/Thread';
import { Create } from './components/Create';
import { Home } from './pages/Home';
import { useState } from 'react';

export const apiURL = import.meta.env.VITE_API_URL;

function Login() {
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  return (
    <>
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
        onClick={() => {
          fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: inputId, password: inputPassword }),
          }).then((res) => {
            if (res.status === 200) {
              alert('로그인 성공');
            } else {
              alert('로그인 실패');
            }
          });
        }}
      >
        로그인 시도
      </button>
    </>
  );
}
function SignUp() {
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');

  return <></>;
}

function Header() {
  return (
    <>
      <h1>community banner</h1>
    </>
  );
}
function Nav() {
  return (
    <>
      <div style={{ height: '100px', background: 'gray' }}></div>
    </>
  );
}

function App() {
  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/thread/:id" element={<Thread></Thread>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
      <Create></Create>
    </>
  );
}

export default App;
