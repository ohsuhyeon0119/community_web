import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Thread } from './pages/Thread';
import { Create } from './components/Create';
import { Home } from './pages/Home';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

function Header() {
  return (
    <>
      <h1>community banner</h1>
    </>
  );
}
function Nav() {
  return (
    <div className="Nav">
      <div className="grid-container">
        <div className="grid-item">
          <Link style={{ color: 'black' }} to="/">
            HOME
          </Link>
          <br />
          <p>hot topic -클릭시 #이동하고, boards로 클릭하면 사라진다.</p>
          <p>저번에 했더 velog 라우팅 기능 구현</p>
          <p>hot topic</p>
        </div>
        <div className="grid-item">
          <Link style={{ color: 'black' }} to="/">
            BOARDS
          </Link>
        </div>
        <div className="grid-item">
          <Link style={{ color: 'black' }} to="/">
            USERS
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Nav></Nav>
      {/*<Header></Header>*/}
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/thread/:id" element={<Thread></Thread>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
      <Create></Create>
    </>
  );
}

export default App;
