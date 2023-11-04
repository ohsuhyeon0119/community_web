import LatestThreads from '../components/home/LatestThreads';
import { LoginBox } from '../components/home/LoginBox';
import { Logo } from '../components/home/Logo';
import { Explanation } from '../components/home/Explanation';
//처음 페이지
export function Home() {
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
