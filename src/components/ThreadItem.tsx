import React from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillTag } from 'react-icons/ai';
import styles from './../pages/Home.module.css';
export function ThreadItem() {
  const title = '리액트를 정복하는 최선의 방법';
  const content =
    '다크모드 테마가 변경되면 새로고침을 하거나 페이지를 옮길때에도 그 기능이 유지되어야 합니다 ';

  return (
    <>
      <div className={styles.threadItem}>
        <div className={styles.board}>
          <AiFillTag></AiFillTag>시사
        </div>
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        <div className={styles.content + ' ' + styles.ellipsis}>{content}</div>

        <div className={styles.tag}>#NGO #환경보호 #크라우드펀딩</div>
        <div className={styles.comment}>
          <BiCommentDetail></BiCommentDetail> 3<AiOutlineHeart></AiOutlineHeart>{' '}
          11
        </div>
      </div>
    </>
  );
}
