import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiURL, getPassedTime } from '../App';
import type { Thread } from '../App';
import { getThreadById, deleteThreadById } from '../api';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { BsFillBookmarkFill } from 'react-icons/bs';
import Comment from '../components/thread/comment';
import { getBoards } from '../api';
import { setDelete } from '../module/loginstate';
import { useDispatch } from 'react-redux';
interface ThreadBoxWrapperProps {
  boardcolor: string | undefined;
}
const ThreadBoxWrapper = styled.div<ThreadBoxWrapperProps>`
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

    border-radius: 1rem;

    width: 80%;
    border: ${(props) => '0.5rem solid' + props.boardcolor};
    margin: 0 auto;

    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 768px) {
    .threadbox {
      width: 100%;
      padding: 0.5rem;
    }
    .reviewbox {
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
    margin-bottom: 1.5rem;
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
    margin-left: 1rem;
  }
  button:hover {
    transform: scale(1.15);
  }
  .review_content {
    font-weight: 800;
    font-size: 1.3rem;
  }
  .review_liked {
  }
  img {
    width: 80%;
    margin: 0 auto;
    height: auto;
  }
`;

interface ThreadBoxProps {
  thread: Thread;
  id: number;
  boardcolor: string;
  boardicon: string;
  setDeleteId: (id: number | null) => void;
}

function ThreadBox({
  thread,
  id,
  boardcolor,
  boardicon,
  setDeleteId,
}: ThreadBoxProps) {
  const navi = useNavigate();
  const dispatch = useDispatch();
  function onSetDelete() {
    dispatch(setDelete());
  }

  const comments = [
    {
      username: 'suhyeon',
      content:
        '리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다. 리뷰에 동감하는 바입니다.',
      thumbsup: 3,
    },
    { username: 'suhyeon', content: 'hi', thumbsup: 3 },
    { username: 'suhyeon', content: 'hi', thumbsup: 3 },
    { username: 'suhyeon', content: 'hi', thumbsup: 3 },
    { username: 'suhyeon', content: 'hi', thumbsup: 3 },
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
            <div className="title"> {thread?.title}</div>

            <div className="box">
              <span>{getPassedTime(thread.date)}</span>
              <button
                onClick={() => {
                  navi('/write/' + id);
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
          <p className="review_liked">liked {thread?.liked}</p>
          <p>author : {thread?.author}</p>
          <img
            src="https://dt40dm21pj8em.cloudfront.net/uploads/froala/file/4355/%EB%B7%B0%ED%8B%B0%20MD%201.jpg"
            alt=""
          />
        </div>

        <div className="comments">
          {comments.map((comment) => {
            return <Comment comment={comment}></Comment>;
          })}
        </div>
      </div>
    </ThreadBoxWrapper>
  );
}

interface ThreadProps {
  setDeleteId: (id: number | null) => void;
}
export function Thread({ setDeleteId }: ThreadProps) {
  const { id } = useParams();
  const [boardcolor, setBoardcolor] = useState('');
  const [boardicon, setBoardicon] = useState('');
  const threadQuery = useQuery({
    queryKey: ['thread', Number(id)],
    queryFn: () => getThreadById(Number(id)),
  });
  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });
  useEffect(() => {
    if (!!threadQuery.data && !!boardsQuery.data) {
      const board = boardsQuery.data?.filter((board) => {
        return board.boardName === threadQuery.data.boardName;
      })[0]; // boards에서 thread의 boardName과 같은 board의 boardColor를 가져온다.

      setBoardcolor(board.boardColor);
      setBoardicon(board.icon);
      console.log('board:', board);
    }
  }, [boardsQuery.data, threadQuery.data]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {!!threadQuery.data && (
        <ThreadBox
          setDeleteId={setDeleteId}
          thread={threadQuery.data}
          boardcolor={boardcolor}
          boardicon={boardicon}
          id={Number(id)}
        ></ThreadBox>
      )}
    </div>
  );
}
