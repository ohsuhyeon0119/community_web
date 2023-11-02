import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiURL } from '../App';
import styled from 'styled-components';
import { AiOutlineDown } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import type { Board } from '../App';
import { AiOutlineUp } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../module';
import { ChangeTitle, ChangeContent } from '../module/write';
import { getThreadById, getBoards } from '../api/index';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';

interface StyledCreatePageWrapperProps {
  boardclicked: 'boardclicked' | undefined;
  boxclicked: 'boxclicked' | undefined;
  boardcolor: string;
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
    border: 10px solid ${(props) => props.boardcolor || 'none'};
    padding: 0.5rem;
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
  // id를 받으면 해당 thread를 수정할 수 있도록 받아온다.

  const { id } = useParams();
  const navi = useNavigate();
  const title = useSelector((state: RootState) => state.writeReducer.title);
  const content = useSelector((state: RootState) => state.writeReducer.content);
  const [isSelectboxClicked, setIsSelectboxClicked] = useState(false);
  const [clickedBoard, setClickedBoard] = useState<string>(''); // 선택된 board
  const [boardcolor, setBoardcolor] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navi('/login');
    }
  }, []);

  const queryClient = useQueryClient(); // 캐싱에 대한 직접 접근 및 조작
  const postThreadMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${apiURL}/thread`, data).then((res) => res.data);
    },
    onSuccess: (data) => {
      navi('/thread/' + data.id);
    },
  });
  const updateThreadMutation = useMutation({
    mutationFn: (data) => {
      return axios.put(`${apiURL}/thread/${id}`, data).then((res) => res.data);
    },
    onSuccess: () => {
      navi('/thread/' + id);
      queryClient.removeQueries({ queryKey: ['thread', Number(id)] });
      // 수정 후에는 수정 전 데이터를 삭제해 준다.
    },
  });

  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });
  const ThreadQuery = useQuery({
    queryKey: ['thread', Number(id)],
    queryFn: () => {
      return getThreadById(Number(id));
    },
    enabled: !!id,
  });

  const boards = boardsQuery.data;
  const thread = ThreadQuery?.data;
  console.log('thread: ', thread);
  console.log('boards: ', boards);

  const OnChangeTitle = (title: string) => {
    dispatch(ChangeTitle(title));
  };
  const onChangeContent = (content: string) => {
    dispatch(ChangeContent(content));
  };

  useEffect(() => {
    if (!!id && !!thread && !!boards) {
      const clickedBoardColor = boards?.filter((boardItem) => {
        return boardItem.boardName === thread?.boardName;
      })[0].boardColor;
      setBoardcolor(clickedBoardColor || '');
      // POST할 데이터 객체
      console.log('clickedboardcolor : ', clickedBoardColor);
      setClickedBoard(thread?.boardName);
      // 선택한 board의 색깔을 검색

      OnChangeTitle(thread?.title || '');
      onChangeContent(thread?.content || '');
    }
  }, [thread, boards]);
  // react-query에서 값을 다 받아오면 진행한다.

  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      OnChangeTitle('');
      onChangeContent('');
    };
  }, []);
  return (
    <StyledCreatePageWrapper
      boardcolor={boardcolor}
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
              boards,
              setBoardcolor,
            }}
          ></SelectBox>
          <hr />
          <input
            ref={inputRef}
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
            value={content}
            onChange={(e) => {
              textareaRef.current!.style.height = 'auto';
              textareaRef.current!.style.height =
                textareaRef.current!.scrollHeight + 'px';
              // 스크롤 크기 만큼 높이를 늘려주는 로직
              onChangeContent(e.target.value);
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
                const data = {
                  title: title,
                  content: content,
                  boardName: clickedBoard,
                  author: 'suhyeon',
                  id: Number(id) as number,
                };

                if (!!id) {
                  updateThreadMutation.mutate(data);
                } else {
                  postThreadMutation.mutate(data);
                }
              }}
            >
              {!!id ? '수정' : '등록'}
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
  boards: Board[] | null;
  setBoardcolor: (value: string) => void;
}

function SelectBox({
  isSelectboxClicked,
  setIsSelectboxClicked,
  clickedBoard,
  setClickedBoard,
  boards,
  setBoardcolor,
}: SelectBoxProps) {
  //똑같은 api가 latesthread에도 있음. 이거는 나중에 고치기

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
              {!!clickedBoard ? clickedBoard : '게시판을 선택해 주세요.'}{' '}
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
                      const clickedBoardColor = boards?.filter((boardItem) => {
                        return boardItem.boardName === board.boardName;
                      })[0].boardColor;
                      setBoardcolor(clickedBoardColor || '');
                      // POST할 데이터 객체
                      console.log('clickedboardcolor : ', clickedBoardColor);
                      setClickedBoard(board.boardName);
                      // 선택한 board의 색깔을 검색
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
