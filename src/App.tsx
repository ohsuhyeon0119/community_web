import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import { Thread } from './pages/Thread';
import { Create } from './components/Create';
import { Home } from './pages/Home';
import { useState } from 'react';
import Test from './pages/Test';
import { Nav } from './Nav';
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
function ScreenLayout() {
  return (
    <div className="ScreenLayout">
      <div className="navContainer">
        <Nav></Nav>
      </div>
      <div className="mainContainer">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/:nav?" element={<ScreenLayout></ScreenLayout>}>
          {/* nav는 선택적으로 들어간다.  nested 된 애들은 /를 붙이면 안된다. */}
          <Route path="" element={<Home></Home>}></Route>
          <Route path="thread/:id" element={<Thread></Thread>}></Route>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="test" element={<Test></Test>}></Route>
        </Route>
      </Routes>
      {/*<Create></Create>*/}
    </>
  );
}

export default App;
