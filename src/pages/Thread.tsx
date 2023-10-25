import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiURL } from '../App';
export function Thread() {
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputContent, setInputContent] = useState<string>('');
  const [editMode, setEditMode] = useState(false);
  const navi = useNavigate();

  const { id } = useParams();
  const [threadData, setThreadData] = useState<{
    title: string;
    id: Number;
    author: string;
    content: string;
    date: Date;
    liked: number;
  } | null>();

  useEffect(() => {
    fetch(apiURL + '/thread/' + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // 성공적으로 데이터를 가져온 경우 실행될 코드
        setInputContent(data.content);
        setInputTitle(data.title);
        setThreadData(data);
        console.log('get request completed: ', data);
      })
      .catch((error) => {
        // 오류 처리
        console.error('데이터 가져오기 실패:', error);
      });
  }, [editMode]);

  return (
    <>
      {editMode ? (
        <>
          <h1>edit</h1>
          <input
            value={inputTitle}
            onChange={(e) => {
              setInputTitle(e.target.value);
            }}
            type="text"
          />{' '}
          <hr />{' '}
          <input
            value={inputContent}
            onChange={(e) => {
              setInputContent(e.target.value);
            }}
            type="text"
          />{' '}
          <hr />
          <button
            onClick={() => {
              setInputContent('');
              setInputTitle('');

              // put 요청을 보낸다. 단. get 요청 받은 곳과 같은 엔드포인트이다.
              fetch(apiURL + '/thread/' + id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json', // 요청 본문의 데이터 유형 지정 (JSON 사용 예시)
                },
                body: JSON.stringify({
                  title: inputTitle,
                  content: inputContent,
                }), // JSON 데이터 전송 (원하는 데이터로 대체)
              })
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  // 성공적으로 데이터를 업데이트한 경우 실행될 코드

                  console.log('put request completed: ', data);
                  setEditMode(false);
                })
                .catch((error) => {
                  // 오류 처리
                  console.error('데이터 업데이트 실패:', error);
                });
            }}
          >
            완료
          </button>
        </>
      ) : (
        <>
          <h1>{threadData?.title}</h1>
          <p>{threadData?.content}</p>
          <p>{threadData?.liked}</p>
          <p>author : {threadData?.author}</p>
          <p>date : {threadData?.date.toString()}</p>
          <hr />
          <button
            onClick={() => {
              setEditMode(true);
            }}
          >
            수정
          </button>
        </>
      )}

      <button disabled={true}>좋아요</button>
      <button
        onClick={() => {
          navi(-1);
        }}
      >
        뒤로가기
      </button>
      <button
        onClick={() => {
          fetch(apiURL + 'thread/' + id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json', // 요청 본문의 데이터 유형 지정 (JSON 사용 예시)
            },
          })
            .then((response) => {
              // HTTP 응답을 JSON으로 파싱
              return response.json();
            })
            .then((data) => {
              // 성공적으로 데이터를 업데이트한 경우 실행될 코드
              console.log('delete request completed: ', data);
              navi('/');
            })
            .catch((error) => {
              // 오류 처리
              console.error('데이터 업데이트 실패:', error);
            });
        }}
      >
        게시글 삭제
      </button>
    </>
  );
}
