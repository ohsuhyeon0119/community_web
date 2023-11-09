import { useNavigate } from 'react-router-dom';
import { getPassedTime } from '../../utils/utils';
import type { Thread } from '../../type/type';
import { IconContext } from 'react-icons';
import { BsFillBookmarkFill } from 'react-icons/bs';
import Comment from './comment';
import { setDelete } from '../../module/modal';
import { useDispatch } from 'react-redux';
import { ThreadBoxWrapper } from '../../pages/Thread_id';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
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
  boardicon,
  setDeleteId,
}: ThreadBoxProps) {
  const [toggle_liked, set_toggle_liked] = useState(false);
  const navi = useNavigate();
  const dispatch = useDispatch();
  function onSetDelete() {
    dispatch(setDelete());
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
            navi(-1);
          }}
        >
          뒤로 돌아가기
        </button>
      </div>
    </ThreadBoxWrapper>
  );
}
