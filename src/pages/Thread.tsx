import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiURL } from '../App';
import type { Thread } from '../App';
import { getThreadById, deleteThreadById } from '../api';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { FaRegUser } from 'react-icons/fa';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import { BsHandThumbsUp } from 'react-icons/bs';
import Comment from '../components/thread/comment';
import { getBoards } from '../api';
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
    display: flex;
    flex-direction: column;
    align-items: center;
    border-left: 1.2px solid rgb(222, 222, 222);
    border-right: 1.2px solid rgb(222, 222, 222);
    border-top: 1.2px solid rgb(222, 222, 222);
  }
  .threadbox {
    position: relative;
    background-color: white;
    color: #444444;

    border-radius: 1rem;
    padding: 0.5rem;
    width: 80%;
    border: ${(props) => '1rem solid' + props.boardcolor};
    margin: 0 auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 768px) {
    .threadbox {
      width: 90%;
    }
    .reviewbox {
      width: 100%;
    }
  }
`;

interface ThreadBoxProps {
  thread: Thread;
  id: number;
  boardcolor: string;
}

function ThreadBox({ thread, id, boardcolor }: ThreadBoxProps) {
  const navi = useNavigate();

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
        <div className="reviewbox">
          <h1>{thread?.title}</h1>
          <p>{thread?.content}</p>
          <p>{thread?.liked}</p>
          <p>author : {thread?.author}</p>
          <p>date : {thread?.date.toString()}</p>{' '}
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
              deleteThreadById(Number(id));
              navi(-1);
            }}
          >
            게시글 삭제
          </button>
        </div>

        <div className="comments">
          {comments.map((comment) => {
            return <Comment comment={comment}></Comment>;
          })}
        </div>

        <hr />
        <button
          onClick={() => {
            navi('/write/' + id);
          }}
        >
          수정
        </button>
      </div>
    </ThreadBoxWrapper>
  );
}

export function Thread() {
  const { id } = useParams();
  const [boardcolor, setBoardcolor] = useState('');
  const threadQuery = useQuery({
    queryKey: ['thread', Number(id)],
    queryFn: () => getThreadById(Number(id)),
  });
  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });
  useEffect(() => {
    const boardColor = boardsQuery.data?.filter((board) => {
      return board.boardName === threadQuery.data.boardName;
    })[0].boardColor; // boards에서 thread의 boardName과 같은 board의 boardColor를 가져온다.

    setBoardcolor(boardColor);
  }, []);

  return (
    <div>
      {!!threadQuery.data && (
        <ThreadBox
          thread={threadQuery.data}
          boardcolor={boardcolor}
          id={Number(id)}
        ></ThreadBox>
      )}
    </div>
  );
}
