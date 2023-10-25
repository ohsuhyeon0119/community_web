import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../App';
export function Create() {
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputContent, setInputContent] = useState<string>('');
  const [createMode, setCreateMode] = useState(false);
  const navi = useNavigate();
  return (
    <>
      {createMode && (
        <>
          <h1>create</h1>
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
        </>
      )}
      <button
        onClick={() => {
          if (!createMode) {
            setCreateMode(true);
          } else {
            setCreateMode(false);

            // POST할 데이터 객체
            const postData = {
              title: inputTitle,
              content: inputContent,
              author: 'suhyeon',
              // author은 suhyeon으로 임시 설정
            };
            // fetch를 사용하여 POST 요청 보내기
            fetch(apiURL + '/thread', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // JSON 데이터를 보내므로 헤더 설정
              },
              body: JSON.stringify(postData), // POST 요청 본문에 JSON 데이터 전송
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('network error');
                }
                return response.json(); // 서버에서의 응답을 JSON 형식으로 파싱
              })
              .then((data) => {
                console.log('POST request completed: ', data);

                navi('/thread/' + data.id.toString());
              })
              .catch((error) => {
                console.error('POST request failed: ', error);
              });
          }
        }}
      >
        새 글 작성
      </button>
    </>
  );
}
