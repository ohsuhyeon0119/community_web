import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Thread } from './pages/Thread';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { SignUp } from './pages/SignUp';
import { ScreenLayout } from './pages/ScreenLayout';
import { Login } from './pages/Login';
import { CreateButton } from './components/CreateButton';
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
  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<ScreenLayout></ScreenLayout>}>
          <Route path="" element={<Home></Home>}></Route>
          <Route path="thread" element={<h1>thread</h1>}></Route>
          <Route path="user" element={<h1>user</h1>}></Route>
          <Route path="thread/:id" element={<Thread></Thread>}></Route>
          <Route path="search" element={<h1>search</h1>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
          <Route path="create" element={<Create></Create>}></Route>
        </Route>
      </Routes>
      <CreateButton></CreateButton>
    </>
  );
}

export default App;
