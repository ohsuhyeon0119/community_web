import { ThreadsList } from '../components/ThreadsList';

//처음 접속할때 보여준다
export function Home() {
  return (
    <>
      <h1>home</h1>
      <hr />
      <main>
        <ThreadsList></ThreadsList>
      </main>

      <hr />
    </>
  );
}
