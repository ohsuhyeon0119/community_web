import { ThreadItem } from '../ThreadItem';
import styles from './../../pages/Home.module.css';
export default function LatestThreads() {
  return (
    <>
      <h1>LATEST THREADS</h1>
      <div className={styles['home-threadItem-Container']}>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
      </div>
    </>
  );
}
