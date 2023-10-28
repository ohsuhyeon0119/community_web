import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../App';
import styled from 'styled-components';
import { AiOutlineDown } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import type { Board } from './../App';
import { AiOutlineUp } from 'react-icons/ai';

const StyledCreatePageWrapper = styled.div`
  & .createWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    width: 100%;
  }
  & .createForm {
    width: 600px;
    min-height: 600px;
  }

  /* input css는 전역으로 설정됨 -> 추후에 리팩토링 */
  & input,
  & textarea {
    -webkit-appearance: none;

    -moz-appearance: none;

    appearance: none;

    width: 90%;

    border: none;
    margin: 20px;
    font-size: 24px;
    font-weight: bold;
  }
  & textarea {
    font-size: 20px;
    height: 500px;
    font-weight: none;
    resize: none;
  }
  & input:focus,
  & textarea:focus {
    outline: none; /* 포커스된 상태일 때의 테두리 스타일을 없앰 */
  }

  & .selectBox {
    width: 300px;

    height: 40px;
    border: 2px solid rgb(182, 170, 170);
  }
  & .selectBox > .updownIcon {
    float: right;
    margin-right: 10px;
  }
  & .selectItem {
    border: 1px solid black;
  }
  & .selectItem:hover {
    background-color: rgb(182, 170, 170);
  }

  & .selectWrapper {
  }
  & .selectList {
    overflow-y: scroll;
    border: 1px solid black;
  }
`;

export function Create() {
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputContent, setInputContent] = useState<string>('');
  const [createMode, setCreateMode] = useState(false);
  const [isSelectboxClicked, setIsSelectboxClicked] = useState(false);
  const [clickedBoard, setClickedBoard] =
    useState<string>('게시판을 선택하세요.'); // 선택된 board

  const navi = useNavigate();

  return (
    <StyledCreatePageWrapper>
      <div className={'createWrapper'}>
        <form
          className={'createForm'}
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

              boardName: clickedBoard,
              // author은 suhyeon으로 임시 설정
            };
            console.log(postData);
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
        <SelectBox
          {...{
            isSelectboxClicked,
            setIsSelectboxClicked,
            clickedBoard,
            setClickedBoard,
          }}
        ></SelectBox>
      </div>
    </StyledCreatePageWrapper>
  );
}
interface SelectBoxProps {
  isSelectboxClicked: boolean;
  setIsSelectboxClicked: (value: boolean) => void;
  clickedBoard: string;
  setClickedBoard: (value: string) => void;
}

function SelectBox({
  isSelectboxClicked,
  setIsSelectboxClicked,
  clickedBoard,
  setClickedBoard,
}: SelectBoxProps) {
  //똑같은 api가 latesthread에도 있음. 이거는 나중에 고치기

  const [boards, setBoards] = useState<Board[] | null>(null);
  useEffect(() => {
    fetch(apiURL + `/boards`)
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
      <div className={'selectWrapper'}>
        <div
          onClick={() => {
            setIsSelectboxClicked(!isSelectboxClicked);
          }}
          className={'selectBox'}
        >
          <span>{clickedBoard}</span>
          <span className="updownIcon">
            {isSelectboxClicked ? (
              <AiOutlineUp> </AiOutlineUp>
            ) : (
              <AiOutlineDown></AiOutlineDown>
            )}
          </span>
        </div>
        <div className={'selectList'}></div>
        {isSelectboxClicked &&
          boards?.map((board, i) => {
            return (
              <div
                onClick={() => {
                  setClickedBoard(board.boardName);
                }}
                key={i}
                className={'selectItem'}
              >
                {board.boardName}
              </div>
            );
          })}
      </div>
    </IconContext.Provider>
  );
}
