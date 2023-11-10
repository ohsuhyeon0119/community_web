import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Thread } from './pages/Thread_id';
import { Nav } from './components/fixed/Nav';
import { Home } from './pages/Home';
import { Write } from './pages/Write';
import { SignUp } from './pages/SignUp';
import { ScreenLayout } from './pages/ScreenLayout';
import { Login } from './pages/Login';
import { CreateButton } from './components/fixed/CreateButton';
import { useSelector, useDispatch } from 'react-redux';
import { initLoginState } from './module/loginstate';
import { RootState } from './module';
import Boards from './pages/Boards';
import Header from './components/fixed/Header';
import { useEffect, useState } from 'react';
import User from './pages/User';
import LoginAlert from './components/modal/LoginAlertModal';
import DeleteModal from './components/modal/Deletemodal';
import Search from './pages/Search';

// export const apiURL = import.meta.env.VITE_API_URL;
export const apiURL =
  'https://port-0-community-api-3yl7k2blos1nj70.sel5.cloudtype.app';
// 배포용 서버에 접근하고 싶다면 cloutype에서 배포용 서버의 ip주소를 적어준다.
function App() {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const alertModal_isvisible = useSelector(
    (state: RootState) => state.modalReducer.alertModal_isvisible
  );
  const deleteModal_isvisible = useSelector(
    (state: RootState) => state.modalReducer.deleteModal_isvisible
  );

  const dispatch = useDispatch();
  function onInitLoginState() {
    dispatch(initLoginState());
  }

  useEffect(() => {
    onInitLoginState();
  }, []);

  return (
    <>
      {alertModal_isvisible && <LoginAlert></LoginAlert>}
      {deleteModal_isvisible && (
        <DeleteModal
          deleteId={deleteId}
          setDeleteId={setDeleteId}
        ></DeleteModal>
      )}

      <Header></Header>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<ScreenLayout></ScreenLayout>}>
          <Route path="" element={<Home></Home>}></Route>
          <Route path="boards/:boardName" element={<Boards></Boards>}></Route>
          <Route
            path="thread/:id"
            element={<Thread setDeleteId={setDeleteId}></Thread>}
          ></Route>
          <Route path="search" element={<Search></Search>}></Route>
          <Route path="user" element={<User></User>}></Route>

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
