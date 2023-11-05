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
import { useEffect, useState } from 'react';
import User from './pages/User';
import LoginAlert from './components/LoginAlert';
import DelteModal from './components/Deletemodal';
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
  date: string;
  liked: number;
  boardName: string;
}
export function getPassedTime(target: string) {
  const currentTime = new Date();

  const targetTime = new Date(target);

  // 두 날짜 사이의 시간 차이 계산
  const timeDifference = currentTime.getTime() - targetTime.getTime();

  // 차이를 밀리초로 표시하므로 원하는 형식으로 변환할 수 있습니다.

  const minutes = Math.floor(timeDifference / 1000 / 60);
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
}

function App() {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const alertModal_isvisible = useSelector(
    (state: RootState) => state.loginStateReducer.alertModal_isvisible
  );
  const deleteModal_isvisible = useSelector(
    (state: RootState) => state.loginStateReducer.deleteModal_isvisible
  );
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
  useEffect(() => {
    // 로그인 여부 초기화
    onInit();
  }, []);

  return (
    <>
      {alertModal_isvisible && <LoginAlert></LoginAlert>}
      {deleteModal_isvisible && (
        <DelteModal deleteId={deleteId} setDeleteId={setDeleteId}></DelteModal>
      )}
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
          <Route
            path="thread/:id"
            element={<Thread setDeleteId={setDeleteId}></Thread>}
          ></Route>
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
