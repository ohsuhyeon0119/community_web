import LatestThreads from '../components/home/LatestThreads';
import { Login } from '../components/home/Login';
import { Logo } from '../components/home/Logo';

//처음 페이지
export function Home() {
  return (
    <>
      <Logo></Logo>
      <Login></Login>
      <LatestThreads></LatestThreads>
    </>
  );
}
