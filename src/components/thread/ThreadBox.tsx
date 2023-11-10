import { useLocation, useNavigate } from 'react-router-dom';
import { getPassedTime } from '../../utils/utils';
import type { Thread } from '../../type/type';
import { IconContext } from 'react-icons';
import { BsFillBookmarkFill } from 'react-icons/bs';
import Comment from './comment';
import { setDelete } from '../../module/modal';
import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import { setAlert } from '../../module/modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../module';
interface ThreadBoxWrapperProps {
  boardcolor: string | undefined;
}
export const ThreadBoxWrapper = styled.div<ThreadBoxWrapperProps>`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .reviewbox {
    width: 80%;
    height: 100%;
  }
  .threadbox {
    position: relative;
    background-color: white;
    color: #444444;

    width: 80%;
    border-top: ${(props) => '0.5rem solid' + props.boardcolor};
    margin: 0 auto;

    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .comments {
    width: 80%;
  }
  @media (max-width: 768px) {
    .threadbox {
      width: 100%;
      padding: 0.5rem;
    }
    .reviewbox {
      width: 100%;
    }
    .comments {
      width: 100%;
    }
  }
  .bookmark {
    position: absolute;
    top: -1rem;
    left: +2rem;
  }
  .titlewrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 3rem;
    font-weight: 800;
    margin-top: 1.5rem;
    padding-top: 1rem;
    margin-bottom: 1.5rem;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .box {
    color: #a6a6a6;
  }
  button {
    background-color: inherit;
    color: #a6a6a6;
    border: none;
    z-index: 10;
    cursor: pointer;
    transition: transform 0.2s;
    margin-left: 0.4rem;
  }
  button:hover {
    transform: scale(1.15);
  }
  .review_content {
    font-weight: 800;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    line-height: 2.3rem;
    font-size: 1.3rem;
  }
  .liked {
    color: black;
    padding-right: 1rem;
  }
  .likedicon {
    cursor: pointer;
    color: red;
    margin-right: 0.5rem;
  }
  img {
    width: 80%;
    margin: 0 auto;
    height: auto;
  }
  .explanation {
    font-size: 1.2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 2rem;
    padding-top: 2rem;
    border: none;
  }
  .backbutton {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .backbutton:hover {
    color: black;
    font-weight: bold;
    transform: scale(1);
  }
`;

interface ThreadBoxProps {
  thread: Thread;
  id: number;
  boardcolor: string;
  boardicon: string;
  setDeleteId: (id: number | null) => void;
}
export function ThreadBox({
  thread,
  id,
  boardcolor,
  
  setDeleteId,
}: ThreadBoxProps) {
  const [toggle_liked, set_toggle_liked] = useState(false);
  const navi = useNavigate();

  const { pathname, search, state } = useLocation(); //state는 이전 페이지가 전달한 값
  const dispatch = useDispatch();
  function onSetDelete() {
    dispatch(setDelete());
  }
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );

  function onSetAlert() {
    dispatch(setAlert());
  }

  const comments = [
    {
      username: 'suhyeon',
      content: '리뷰가 정말로 많은 도움이 되었습니다!',
      thumbsup: 3,
    },
    { username: 'jiyun', content: '리뷰가 별로에요', thumbsup: 5 },
    { username: 'hojin', content: '혹시 얼마 하나요?', thumbsup: 6 },
    { username: 'min', content: '옷이 참 예쁘네요', thumbsup: 0 },
    { username: '말하는감자', content: '잘 어울릴 것 같아요', thumbsup: 1 },
  ];
  return (
    <ThreadBoxWrapper boardcolor={boardcolor}>
      <div className="threadbox">
        <IconContext.Provider value={{ size: '3rem', color: boardcolor }}>
          <span className="bookmark">
            <BsFillBookmarkFill></BsFillBookmarkFill>
          </span>
        </IconContext.Provider>
        <div className="reviewbox">
          <div className="titlewrapper">
            <div className="title"> {thread?.title} </div>

            <div className="box">
              <span>{getPassedTime(thread.date)}</span>
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    navi('/write/' + id.toString(), {
                      state: { pathname, search },
                    });
                  } else {
                    onSetAlert();
                  }
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  setDeleteId(id);
                  onSetDelete();
                }}
              >
                삭제
              </button>
            </div>
          </div>
          <p className="review_content">{thread?.content}</p>

          <div className="explanation">
            <span className="author">
              written by{' '}
              <span style={{ fontWeight: 'bold' }}>{thread?.author}</span>
            </span>
            <span
              onClick={() => {
                set_toggle_liked(!toggle_liked);
              }}
              className="liked"
            >
              <span className="likedicon">
                {' '}
                {toggle_liked ? (
                  <AiFillHeart></AiFillHeart>
                ) : (
                  <AiOutlineHeart></AiOutlineHeart>
                )}
              </span>
              {thread?.liked + (toggle_liked ? 1 : 0)}
            </span>
          </div>
        </div>

        <div className="comments">
          {comments.map((comment) => {
            return <Comment comment={comment}></Comment>;
          })}
        </div>
        <button
          className="backbutton"
          onClick={() => {
            console.log('state:', state);
            if (state !== null && state.pathname.includes('boards')) {
              // boards페이지에서 왔다면 PAGENUM을 기억한 채 boards페이지로
              navi(`${decodeURI(state.pathname)}${state.search}`);
            } else {
              navi(`/boards/${thread.boardName}?pagenum=1`);
              // 그렇지 않다면 해당 BOARD의 첫 페이지로 보낸다.
            }
          }}
        >
          글 목록
        </button>
      </div>
    </ThreadBoxWrapper>
  );
}
