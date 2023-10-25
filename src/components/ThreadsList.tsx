import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiURL } from '../App';
export function ThreadsList() {
  const [data, setData] = useState<
    | {
        title: string;
        id: Number;
        author: string;
      }[]
    | null
  >(null);
  useEffect(() => {
    fetch(apiURL + '/threadlist')
      .then((response) => {
        // HTTP 응답을 JSON으로 파싱
        return response.json();
      })
      .then((data) => {
        // 성공적으로 데이터를 가져온 경우 실행될 코드
        console.log('threads get request completed: ', data);

        setData(data);
      })
      .catch((error) => {
        // 오류 처리
        console.error('데이터 가져오기 실패:', error);
      });
  }, []);
  return (
    <p>
      {data?.map((thread) => {
        return (
          <li key={thread.id as number}>
            <Link to={'/thread/' + thread.id.toString()}>{thread.title}</Link>
          </li>
        );
      })}
    </p>
  );
}
