import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';

import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import type { Thread } from '../../type/type';
import { useNavigate } from 'react-router-dom';
import { imgDb } from '../../db';
import styled from 'styled-components';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { getlimitedString } from '../../utils/utils';

interface ThreadItemProps {
  thread: Thread;
  boardColor: string | undefined;
}
interface StyledThreadItemWrapperProps {
  boardcolor: string | undefined;
}

const StyledThreadItemWrapper = styled.div<StyledThreadItemWrapperProps>`
  .threadItem {
    text-align: center;
    /* 반응형 고려해야 함 */
    width: 18rem;

    display: grid;

    grid-template-rows: 10rem 1.5rem 5rem 1.5rem 3rem; /* 3개의 행을 생성 */
    grid-template-areas:
      'image'
      'title'
      'content'
      'date'
      'info';

    /* 애니메이션  */
    transform: translateY(0rem);
    box-shadow: 0.08rem 0.08rem 0.08rem 0.08rem rgba(78, 120, 97, 0.3);
    transition: box-shadow 0.5s, transform 1s, opacity 1s;

    opacity: 0;
    margin: 1rem;
  }
  /* 이미 보여진 경우 애니메이션은 따로 실행하지 않는다. */

  .alreadyShown {
    opacity: 1;
    transform: translateY(-1.5rem);
  }

  .threadItem > * {
    cursor: pointer;
  }
  .image {
    grid-area: image;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: auto;
  }
  .title {
    grid-area: title;
  }
  .title h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .content {
    grid-area: content;
    padding-right: 1rem;
    padding-left: 1rem;
  }
  .content p {
    font-size: 0.8rem;
    padding: 0.5rem;
    height: 5rem;
    margin: 0px;
    text-align: left;
  }
  .date {
    grid-area: date;
    padding-right: 1rem;
    padding-left: 1rem;
  }
  .date p {
    padding: 0rem;
    margin: 0px;
    text-align: right;
  }
  .info {
    grid-area: info;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1rem;
    padding-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: ${(props) => props.boardcolor};
  }

  .info .tag {
    text-align: left;
  }
  .comment {
    span + span {
      margin-left: 0.5rem;
    }
  }

  & .threadItem:hover {
    box-shadow: 0.2rem 0.2rem 0.7rem 0.2rem rgba(78, 120, 97, 0.3);
    background-color: ${(props) => props.boardcolor};
    transform: translateY(-2.5rem);
    color: white;
    .info {
      color: white;
    }
  }

  & .ellipsis {
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
    }
  }
  .commenticon {
    margin-right: 0.5rem;
  }
  .hearticon {
    margin-right: 0.5rem;
  }
`;

//boardColor는 스타일링을 위해서 가져온 것.
export function ThreadItem({ thread, boardColor }: ThreadItemProps) {
  const [isShown, setIsShown] = useState(false);

  const navi = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  const randomNumber = Math.floor(Math.random() * 15);
  const [randomImg, setRandomImg] = useState(randomNumber);

  // 자신의 boardName에 해당하는 컬러를 가져온다... 그런데 이거는
  // 나중에 변경 필요. 이러면 모든 thread가 api 요청을 하므로

  // inview가 true이면 isShown을 true로 바꾸고 그걸 유지
  useEffect(() => {
    if (inView) {
      setIsShown(true);
    }
  }, [inView]);

  return (
    <StyledThreadItemWrapper boardcolor={boardColor}>
      <div
        id={`item_${thread.id}`}
        onClick={() => {
          navi('/thread/' + thread.id.toString());
        }}
        ref={ref}
        className={`threadItem ${isShown && 'alreadyShown'}`} //이미 보여줬으면 효과를 또다시 나타낼 필요 없다.
      >
        <div className="image">
          <img src={imgDb[randomImg]}></img>
        </div>
        <div className="title">
          <h3>{thread.title}</h3>
        </div>
        <div className={`content ellipsiis`}>
          <p>{getlimitedString(thread.content)}</p>
        </div>

        <div className="date">
          <p>{new Date(thread.date).toLocaleDateString()}</p>
        </div>
        <div className="info">
          <p className="tag">
            <BsFillBookmarkFill></BsFillBookmarkFill>
            {thread.boardName}
          </p>

          <p className="comment">
            <span>
              <span className="commenticon">
                {' '}
                <BiCommentDetail></BiCommentDetail>
              </span>
              11
            </span>
            <span>
              <span className="hearticon">
                {' '}
                <AiOutlineHeart> </AiOutlineHeart>
              </span>
              0
            </span>
          </p>
        </div>
      </div>
    </StyledThreadItemWrapper>
  );
}
