import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiURL } from '../App';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../module';
import { ChangeTitle, ChangeContent } from '../module/write';
import { getThreadById, getBoards } from '../api/index';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import React from 'react';
import axios from 'axios';
import { SelectBox } from '../components/SelectBox';

interface StyledCreatePageWrapperProps {
  boardclicked: 'boardclicked' | undefined;
  boxclicked: 'boxclicked' | undefined;
  boardcolor: string;
}
// styled component에서  interface 나중에 다 이걸로 바꾸기

const StyledCreatePageWrapper = styled.div<StyledCreatePageWrapperProps>`
  h1 {
    font-size: 2.5rem;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .createWrapper {
    width: 100%;
  }
  .createForm {
    position: relative;
    background-color: white;
    color: #444444;
    border: 5px solid ${(props) => props.boardcolor || 'none'};
    border-radius: 1rem;
    padding: 0.5rem;
    width: 37rem;

    margin: 0 auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
  .bookmark {
    position: absolute;
    top: -1rem;
    left: +2rem;
  }

  /* input css는 전역으로 설정됨 -> 추후에 리팩토링 */
  .titleInput,
  textarea {
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
  .titleInput {
    margin-bottom: 0.7rem;
    margin-top: 0.7rem;
  }
  textarea {
    font-size: 1.2rem;
    min-height: 10rem;
    height: auto;
    font-weight: none;
    resize: none;
  }

  .selectBox {
    width: 100%;
    padding: 0.5rem;

    span:first-child {
      font-size: 1.3rem;
    }
  }
  .selectBox > .updownIcon {
    float: right;
  }
  .selectWrapper {
    position: relatvie;
  }
  .selectList {
    position: absolute;
    overflow-y: scroll;
    border: none;
    width: 97%;
    max-height: 10rem;
  }
  .selectItem {
    padding: 0.5rem;
    font-size: 1.3rem;
    background-color: white;
    border-bottom: 0.05rem solid rgb(182, 170, 170);
  }
  .selectItem:last-child {
    border-bottom: none;
  }
  .selectItem:hover {
    background-color: rgba(192, 192, 192);
  }
  @media (max-width: 768px) {
    .createForm {
      width: 90%;
    }
    h1 {
      font-size: 2.4rem;
      text-align: center;
    }
  }
  .buttonBox {
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
  label {
    font-size: 1.2rem;
    cursor: pointer;
  }
  #upload {
  }
  input[type='file'] {
    display: none;
  }

  .labelWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  label {
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.5rem;
    transform: scale(1.1);
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 5px;
    border: none;
    background-color: ${(props) => props.boardcolor || 'black'};
    cursor: pointer;
  }
  .preview {
    width: 100%;
    height: 20rem;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .preview img {
    opacity: 0.5;
    width: 100%;
    height: auto;
  }
  .preview span {
    cursor: pointer;
    font-size: 2rem;
    position: absolute;
    top: 0px;
    right: 1rem;
    z-index: 100;
    display: none;
  }

  .preview:hover span {
    display: inline;
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
  const [previewImgSrc, setPreviewImgSrc] = useState('');

  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );

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
    if (!isLoggedIn) {
      navi('/login');
    }
    return () => {
      OnChangeTitle('');
      onChangeContent('');
    };
  }, []);

  function onChangeImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setPreviewImgSrc(base64.toString());
      }
    };
  }
  function deleteImgUpload() {
    const imgInput: HTMLInputElement | null = document.querySelector('#upload');
    if (!!imgInput) {
      imgInput.value = '';
    }
  }

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
          {' '}
          <IconContext.Provider value={{ size: '3rem', color: boardcolor }}>
            <span className="bookmark">
              <BsFillBookmarkFill></BsFillBookmarkFill>
            </span>
          </IconContext.Provider>
          <h1>✍ 리뷰 WRITE ✍</h1>
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
          <input
            className="titleInput"
            ref={inputRef}
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => {
              OnChangeTitle(e.target.value);
            }}
            type="text"
          />{' '}
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
          <hr />
          {!previewImgSrc && (
            <p className="labelWrapper">
              <label htmlFor="upload">이미지 업로드</label>
            </p>
          )}
          <input
            id="upload"
            type="file"
            name="imagefile"
            accept="image/*"
            onChange={onChangeImgUpload}
          />
          {previewImgSrc && (
            <div className="preview">
              <span
                className="delete"
                onClick={() => {
                  deleteImgUpload();
                  setPreviewImgSrc('');
                }}
              >
                x
              </span>
              <img src={previewImgSrc}></img>
            </div>
          )}
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
