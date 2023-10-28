import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../App';
import styles from './Create.module.css';
import { AiOutlineDown } from 'react-icons/ai';
import { IconContext } from 'react-icons';

import { AiOutlineUp } from 'react-icons/ai';
export function Create() {
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputContent, setInputContent] = useState<string>('');
  const [createMode, setCreateMode] = useState(false);
  const navi = useNavigate();

  return (
    <div className={styles.createWrapper}>
      <form
        className={styles.createForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          placeholder="제목을 입력해주세요."
          value={inputTitle}
          onChange={(e) => {
            setInputTitle(e.target.value);
          }}
          type="text"
        />{' '}
        <hr />{' '}
        <textarea
          placeholder="내용을 입력해주세요."
          cols={20}
          rows={1}
          value={inputContent}
          onChange={(e) => {
            setInputContent(e.target.value);
          }}
        />{' '}
      </form>

      <button
        onClick={() => {
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
        }}
      >
        새 글 작성
      </button>
      <SelectBox></SelectBox>
    </div>
  );
}
function SelectBox() {
  const [boards, setBoards] = useState<string[] | null>(null);
  useEffect(() => {
    fetch(apiURL + '/boards')
      .then((response) => {
        // HTTP 응답을 JSON으로 파싱
        return response.json();
      })
      .then((data) => {
        // 성공적으로 데이터를 가져온 경우 실행될 코드
        console.log('boards get request completed: ', data);

        setBoards(data);
      })
      .catch((error) => {
        // 오류 처리
        console.error('데이터 가져오기 실패:', error);
      });
  }, []);
  return (
    <IconContext.Provider value={{ size: '30px', color: 'gray' }}>
      <div className={styles.selectWrapper}>
        <div className={styles.selectBox}>
          <span>
            <AiOutlineUp></AiOutlineUp>
          </span>
        </div>
        <div className={styles.selectList}></div>
        {boards?.map((board, i) => {
          return (
            <div key={i} className={styles.selectItem}>
              {board}
            </div>
          );
        })}
      </div>
    </IconContext.Provider>
  );
}
