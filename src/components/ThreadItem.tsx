import React from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillTag } from 'react-icons/ai';
import styles from './../pages/Home.module.css';
import { useInView } from 'react-intersection-observer';
import { useState, useRef, useEffect } from 'react';
import type { Thread } from '../App';
import { useNavigate } from 'react-router-dom';

interface ThreadItemProps {
  thread: Thread;
}

export function ThreadItem({ thread }: ThreadItemProps) {
  const [isShown, setIsShown] = useState(false);
  const navi = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  // inview가 true이면 isShown을 true로 바꾸고 그걸 유지
  useEffect(() => {
    if (inView) {
      setIsShown(true);
    }
  }, [inView]);

  return (
    <div
      onClick={() => {
        navi('/thread/' + thread.id.toString());
      }}
      ref={ref}
      className={`${styles.threadItem} ${isShown && styles.alreadyShown}`} //이미 보여줬으면 효과를 또다시 나타낼 필요 없다.
    >
      <div className={styles.board}>
        <AiFillTag></AiFillTag>시사
      </div>
      <div className={styles.title}>
        <h3>{thread.title}</h3>
      </div>
      <div className={styles.content + ' ' + styles.ellipsis}>
        {thread.content}
      </div>

      <div className={styles.tag}>#NGO #환경보호 #크라우드펀딩</div>
      <div className={styles.comment}>
        <BiCommentDetail></BiCommentDetail> 3<AiOutlineHeart></AiOutlineHeart>{' '}
        11
      </div>
    </div>
  );
}
