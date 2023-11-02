import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Thread } from './pages/Thread';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Write } from './pages/Write';
import { SignUp } from './pages/SignUp';
import { ScreenLayout } from './pages/ScreenLayout';
import { Login } from './pages/Login';
import { CreateButton } from './components/CreateButton';
import { useSelector, useDispatch } from 'react-redux';
import { init, setLogin, setLogout } from './module/loginstate';
import { RootState } from './module';
import ThreadsBox from './components/boards/ThreadsBox';
import Boards from './pages/Boards';
import Header from './components/Header';
import { useEffect } from 'react';
import User from './pages/User';
export const apiURL = import.meta.env.VITE_API_URL;

export interface Board {
  boardName: string;
  boardColor: string;
  threadsId: number[];
}

export interface Thread {
  title: string;
  id: Number;
  author: string;
  content: string;
  date: Date;
  liked: number;
  boardName: string;
}

function App() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const token = useSelector(
    (state: RootState) => state.loginStateReducer.token
  );
  const dispatch = useDispatch();
  function onInit() {
    dispatch(init());
  }
  function onLogin(token: string) {
    dispatch(setLogin(token));
  }
  function onLogout() {
    dispatch(setLogout());
  }
  useEffect(() => {
    onInit();
  }, []);
  return (
    <>
      <Header></Header>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<ScreenLayout></ScreenLayout>}>
          <Route path="" element={<Home></Home>}></Route>

          <Route path="user" element={<User></User>}></Route>
          <Route path="boards" element={<Boards></Boards>}>
            <Route
              path=":boardName"
              element={<ThreadsBox></ThreadsBox>}
            ></Route>
          </Route>
          <Route path="thread/:id" element={<Thread></Thread>}></Route>
          <Route path="search" element={<h1>search</h1>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
          <Route path="write/:id?" element={<Write></Write>}></Route>
        </Route>
      </Routes>
      <CreateButton></CreateButton>
    </>
  );
}

export default App;
