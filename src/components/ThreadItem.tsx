import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillTag } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import type { Thread } from '../App';
import { useNavigate } from 'react-router-dom';

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
    text-align: center;
    /* 반응형 고려해야 함 */
    width: 18rem;
    height: 18rem;
    display: grid;
    grid-template-columns: 3fr 2fr 2fr 2fr;
    grid-template-rows: 1fr 3fr 1fr 1fr; /* 3개의 행을 생성 */
    grid-template-areas:
      'title title title title'
      'content content content content'
      'tag tag tag tag'
      'board comment comment comment';

    /* 애니메이션  */
    transform: translateY(0rem);
    box-shadow: 0.08rem 0.08rem 0.08rem 0.08rem rgba(78, 120, 97, 0.3);
    transition: box-shadow 0.5s, transform 1s, opacity 1s;

    padding: 0.3rem;
    opacity: 0;

    border: 1rem solid ${(props) => props.boardColor};
  }
  /* 이미 보여진 경우 애니메이션은 따로 실행하지 않는다. */

  & .alreadyShown {
    opacity: 1;
    transform: translateY(-1.5rem);
  }

  & .threadItem > * {
    cursor: pointer;
  }
  & .title {
    grid-area: title;
  }
  & .tag {
    grid-area: tag;
    text-align: center;
  }

  & .comment {
    grid-area: comment;
    text-align: right;
    margin-right: 1rem;
  }
  & .content {
    grid-area: content;
    font-size: 0.8rem;
  }
  & .board {
    grid-area: board;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .threadItem:hover {
    box-shadow: 0.2rem 0.2rem 0.7rem 0.2rem rgba(78, 120, 97, 0.3);
    background-color: ${(props) => props.boardColor};
    transform: translateY(-2.5rem);
    color: white;
  }
  & p {
    margin: 0;
    padding: 0;
  }

  & h3 {
    font-size: 2rem;
    font-weight: bold;
  }
  & .ellipsis {
    font-size: 0.8rem;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }

  @media (max-width: 768px) {
    & .threadItem {
      width: 90vw;

      height: 15rem;
    }
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
          <AiFillTag></AiFillTag>
          {thread.boardName}
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
