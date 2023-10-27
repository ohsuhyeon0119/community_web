import React from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillTag } from 'react-icons/ai';
import styles from './../pages/Home.module.css';
import { InView } from 'react-intersection-observer';
import { useState } from 'react';
export function ThreadItem() {
  const [isShown, setIsShown] = useState(false);

  const title = '리액트를 정복하는 최선의 방법';
  const content =
    '다크모드 테마가 변경되면 새로고침을 하거나 페이지를 옮길때에도 그 기능이 유지되어야 합니다 ';

  return (
    <>
      <InView threshold={0.5}>
        {/* inView 값이 바뀌면서 제 렌더링 ref는 내가 관찰하는 대상 */}
        {({ inView, ref }) => {
          if (inView) {
            setIsShown(true);
          }
          return (
            <div
              ref={ref}
              className={
                isShown
                  ? `${styles.threadItem} ${styles.alreadyShown}`
                  : `${styles.threadItem} ${inView && 'inView'}`
              } //이미 보여줬으면 효과를 또다시 나타낼 필요 없다.
            >
              <div className={styles.board}>
                <AiFillTag></AiFillTag>시사
              </div>
              <div className={styles.title}>
                <h3>{title}</h3>
              </div>
              <div className={styles.content + ' ' + styles.ellipsis}>
                {content}
              </div>

              <div className={styles.tag}>#NGO #환경보호 #크라우드펀딩</div>
              <div className={styles.comment}>
                <BiCommentDetail></BiCommentDetail> 3
                <AiOutlineHeart></AiOutlineHeart> 11
              </div>
            </div>
          );
        }}
      </InView>
    </>
  );
}
