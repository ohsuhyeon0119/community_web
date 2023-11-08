import HotThreads from '../components/home/HotThreads';

import { Explanation } from '../components/home/Explanation';
import { useEffect } from 'react';
//처음 페이지
export function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={'logoAndLoginWrapper'}></div>
      <Explanation></Explanation>
      <HotThreads></HotThreads>
    </>
  );
}
