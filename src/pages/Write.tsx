import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../App';
import styled from 'styled-components';
import { AiOutlineDown } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import type { Board } from '../App';
import { AiOutlineUp } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../module';
import { ChangeTitle } from '../module/write';
interface StyledCreatePageWrapperProps {
  boardclicked: 'boardclicked' | undefined;
  boxclicked: 'boxclicked' | undefined;
}
// styled component에서  interface 나중에 다 이걸로 바꾸기

const StyledCreatePageWrapper = styled.div<StyledCreatePageWrapperProps>`
  & h1 {
    font-size: 4rem;
    text-align: center;
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
  & .createWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
  }
  & .createForm {
    width: 37rem;
    margin-bottom: 5rem;
  }

  /* input css는 전역으로 설정됨 -> 추후에 리팩토링 */
  & input,
  & textarea {
    -webkit-appearance: none;

    -moz-appearance: none;

    appearance: none;

    width: 100%;

    border: none;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
    font-weight: bold;
  }
  & input {
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
  }
  & textarea {
    font-size: 1.2rem;
    min-height: 20rem;
    height: auto;
    font-weight: none;
    resize: none;
  }
  & input:focus,
  & textarea:focus {
    outline: none; /* 포커스된 상태일 때의 테두리 스타일을 없앰 */
  }

  & .selectBox {
    width: 100%;
    padding: 0.5rem;

    span:first-child {
      font-size: 1.3rem;
    }
  }
  & .selectBox > .updownIcon {
    float: right;
  }
  & .selectList {
    position: relative;
    overflow-y: scroll;
    border: none;
    width: 100%;
  }
  & .selectItem {
    padding: 0.5rem;
    font-size: 1.3rem;
    background-color: white;
    border-bottom: 0.05rem solid rgb(182, 170, 170);
  }
  & .selectItem:last-child {
    border-bottom: none;
  }
  & .selectItem:hover {
    background-color: rgba(192, 192, 192);
  }
  @media (max-width: 768px) {
    .createForm {
      width: 100%;
    }
    & h1 {
      font-size: 2.4rem;
      text-align: center;
    }
  }
  & .buttonBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .buttonBox > * {
    font-weight: bold;
    width: 45%;
    height: 3rem;
    margin: 1rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }
  .submitButton {
    background-color: rgb(78, 190, 97);
  }
`;

export function Write() {
  const [inputContent, setInputContent] = useState<string>('');
  const [createMode, setCreateMode] = useState(false);
  const [isSelectboxClicked, setIsSelectboxClicked] = useState(false);
  const [clickedBoard, setClickedBoard] = useState<string | null>(null); // 선택된 board
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const navi = useNavigate();
  const title = useSelector((state: RootState) => state.writeReducer.title);
  const dispatch = useDispatch();

  const OnChangeTitle = (title: string) => {
    dispatch(ChangeTitle(title));
  };

  return (
    <StyledCreatePageWrapper
      boardclicked={clickedBoard ? 'boardclicked' : undefined}
      boxclicked={isSelectboxClicked ? 'boxclicked' : undefined}
    >
      <div className={'createWrapper'}>
        <form
          className={'createForm'}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1>THREAD 올리기</h1>
          <SelectBox
            {...{
              isSelectboxClicked,
              setIsSelectboxClicked,
              clickedBoard,
              setClickedBoard,
            }}
          ></SelectBox>
          <hr />
          <input
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => {
              OnChangeTitle(e.target.value);
            }}
            type="text"
          />{' '}
          <hr />{' '}
          <textarea
            ref={textareaRef}
            placeholder="내용을 입력해주세요."
            cols={20}
            rows={1}
            value={inputContent}
            onChange={(e) => {
              textareaRef.current!.style.height = 'auto';
              textareaRef.current!.style.height =
                textareaRef.current!.scrollHeight + 'px';
              // 스크롤 크기 만큼 높이를 늘려주는 로직
              setInputContent(e.target.value);
            }}
          />{' '}
          <div className="buttonBox">
            <button
              className="cancelButton"
              onClick={() => {
                navi(-1);
              }}
            >
              취소
            </button>
            <button
              className="submitButton"
              onClick={() => {
                // POST할 데이터 객체

                const postData = {
                  title: title,
                  content: inputContent,
                  author: 'suhyeon',

                  boardName: clickedBoard,
                  // author은 suhyeon으로 임시 설정
                };

                if (!!title && !!inputContent && !!clickedBoard) {
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
                } else {
                  alert('제목, 내용, 게시판을 모두 입력해주세요.');
                }
              }}
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </StyledCreatePageWrapper>
  );
}
interface SelectBoxProps {
  isSelectboxClicked: boolean;
  setIsSelectboxClicked: (value: boolean) => void;
  clickedBoard: string | null;
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

  useEffect(() => {
    window.addEventListener('click', () => {
      setIsSelectboxClicked(false);
    });
    return () => {
      window.removeEventListener('click', () => {
        setIsSelectboxClicked(false);
      });
    };
  }, []);

  return (
    <IconContext.Provider value={{ size: '2em', color: 'gray' }}>
      <div className={'selectWrapper'}>
        <div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              // 부모 요소와 클릭이벤트를 분리
              setIsSelectboxClicked(!isSelectboxClicked);
            }}
            className={'selectBox'}
          >
            <span>
              {clickedBoard !== null ? clickedBoard : '게시판을 선택해 주세요.'}{' '}
            </span>
            <span className="updownIcon">
              {isSelectboxClicked ? (
                <AiOutlineUp> </AiOutlineUp>
              ) : (
                <AiOutlineDown></AiOutlineDown>
              )}
            </span>
          </div>
          <div className={'selectList'}>
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
        </div>
      </div>
    </IconContext.Provider>
  );
}
