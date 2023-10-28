import React from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillTag } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { useState, useRef, useEffect } from 'react';
import type { Thread } from '../App';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../App';
import styled, { keyframes, css } from 'styled-components';
interface ThreadItemProps {
  thread: Thread;
  boardColor: string | undefined;
}
interface StyledThreadItemWrapperProps {
  boardColor: string | undefined;
}

const StyledThreadItemWrapper = styled.div<StyledThreadItemWrapperProps>`
  & .threadItem {
    /* 반응형 고려해야 함 */

    display: grid;
    grid-template-columns: 60px 100px 100px 60px;
    grid-template-rows: 40px 200px 40px; /* 3개의 행을 생성 */
    grid-template-areas:
      'board title title title'
      'board content content content'
      'tag tag tag comment';

    /* 애니메이션  */
    transform: translateY(0rem);
    box-shadow: 1px 1px 3px 1px rgba(78, 120, 97, 0.3);
    transition: box-shadow 0.5s, transform 0.5s, opacity 0.5s;

    padding: 5px;
    opacity: 0;

    border: 15px solid ${(props) => props.boardColor};
  }
  /* 이미 보여진 경우 애니메이션은 따로 실행하지 않는다. */

  & .alreadyShown {
    opacity: 1;
    transform: translateY(-1rem);
  }

  & .threadItem > * {
    cursor: pointer;
  }
  & .title {
    grid-area: title;
  }
  & .tag {
    grid-area: tag;
  }

  & .comment {
    grid-area: comment;
    text-align: right;
  }
  & .content {
    grid-area: content;
    font-size: 13px;
  }
  & .board {
    grid-area: board;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .threadItem + .threadItem {
    margin-top: 35px;
  }

  & .threadItem:hover {
    box-shadow: 3px 3px 10px 2px rgba(78, 120, 97, 0.3);
    background-color: ${(props) => props.boardColor};
    transform: translateY(-2rem);
  }
  & p {
    margin: 0;
    padding: 0;
  }

  & h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0px;
    padding: 0px;
  }
  & .ellipsis {
    font-size: 12px;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
`;

//boardColor는 스타일링을 위해서 가져온 것.
export function ThreadItem({ thread, boardColor }: ThreadItemProps) {
  const [isShown, setIsShown] = useState(false);

  const navi = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  // 자신의 boardName에 해당하는 컬러를 가져온다... 그런데 이거는
  // 나중에 변경 필요. 이러면 모든 thread가 api 요청을 하므로

  // inview가 true이면 isShown을 true로 바꾸고 그걸 유지
  useEffect(() => {
    if (inView) {
      setIsShown(true);
    }
  }, [inView]);

  return (
    <StyledThreadItemWrapper boardColor={boardColor}>
      <div
        onClick={() => {
          navi('/thread/' + thread.id.toString());
        }}
        ref={ref}
        className={`threadItem ${isShown && 'alreadyShown'}`} //이미 보여줬으면 효과를 또다시 나타낼 필요 없다.
      >
        <div className="board">
          <AiFillTag></AiFillTag>시사
        </div>
        <div className="title">
          <h3>{thread.title}</h3>
        </div>
        <div className={`content ellipsiis`}>{thread.content}</div>

        <div className="tag">#NGO #환경보호 #크라우드펀딩</div>
        <div className="comment">
          <BiCommentDetail></BiCommentDetail> 3<AiOutlineHeart></AiOutlineHeart>{' '}
          11
        </div>
      </div>
    </StyledThreadItemWrapper>
  );
}
