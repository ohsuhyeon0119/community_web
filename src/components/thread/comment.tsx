import { FaRegUser } from 'react-icons/fa';
import { BsHandThumbsUp } from 'react-icons/bs';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import { useState } from 'react';
import styled from 'styled-components';
const StyledCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .commentbox {
    width: 80%;
    border-left: 1.2px solid rgb(222, 222, 222);
    border-right: 1.2px solid rgb(222, 222, 222);
    border-bottom: 1.2px solid rgb(222, 222, 222);
    min-height: 6rem;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }
  @media (max-width: 768px) {
    .commentbox {
      width: 100%;
    }
  }

  .explanation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }
  .username {
    font-size: 1.2rem;
    font-weight: 800;
    margin-top: 0.5rem;
  }
  .content {
    color: #444444;
  }
  .thumbsup {
    margin-left: 0.5rem;
    background-color: inherit;
    border: none;
    z-index: 10;
    cursor: pointer;
  }
  button {
    background-color: inherit;
    color: #a6a6a6;
    border: none;
    z-index: 10;
    cursor: pointer;
    transition: transform 0.2s;
  }
  button:hover {
    transform: scale(1.15);
  }
  .thumbsupcount {
    margin-left: 0.5rem;
  }
`;
interface CommentProps {
  comment: {
    username: string;
    content: string;
    thumbsup: number;
  };
}
export default function Comment({ comment }: CommentProps) {
  const [toggle_thumbsUp, set_toggle_ThumbsUp] = useState(false);
  return (
    <StyledCommentWrapper>
      {' '}
      <div className="commentbox">
        <p className="explanation">
          <div className="username">
            <FaRegUser></FaRegUser> {comment.username}
          </div>
          <div>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </p>
        <p className="content">{comment.content}</p>
        <span
          className="thumbsup"
          onClick={() => {
            set_toggle_ThumbsUp(!toggle_thumbsUp);
          }}
        >
          {' '}
          {!toggle_thumbsUp ? (
            <BsHandThumbsUp></BsHandThumbsUp>
          ) : (
            <BsHandThumbsUpFill></BsHandThumbsUpFill>
          )}
        </span>
        <span className="thumbsupcount">
          {comment.thumbsup + (toggle_thumbsUp ? 1 : 0)}
        </span>
      </div>
    </StyledCommentWrapper>
  );
}
