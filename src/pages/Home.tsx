import LatestThreads from '../components/home/LatestThreads';
import { LoginBox } from '../components/home/LoginBox';
import { Logo } from '../components/home/Logo';
import { Explanation } from '../components/home/Explanation';
import { useEffect } from 'react';
//처음 페이지
export function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={'logoAndLoginWrapper'}>
        {/* <Logo></Logo> */}
        {/* <LoginBox></LoginBox> */}
      </div>
      <Explanation></Explanation>
      <LatestThreads></LatestThreads>
    </>
  );
}
