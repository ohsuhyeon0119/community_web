import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Thread } from './pages/Thread';

import { Home } from './pages/Home';

import { SignUp } from './pages/SignUp';
import { ScreenLayout } from './pages/ScreenLayout';
export const apiURL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ScreenLayout></ScreenLayout>}>
          <Route path="" element={<Home></Home>}></Route>
          <Route path="boards" element={<h1>boards</h1>}></Route>
          <Route path="user" element={<h1>user</h1>}></Route>
          <Route path="thread/:id" element={<Thread></Thread>}></Route>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
