import React, { useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { AiFillTag } from 'react-icons/ai';
import { IconContext } from 'react-icons';

function Container() {
  const title = '리액트를 정복하는 최선의 방법';
  const content =
    '다크모드 테마가 변경되면 새로고침을 하거나 페이지를 옮길때에도 그 기능이 유지되어야 합니다 ';
  return (
    <>
      <div className="grid-container">
        <div className="board">
          <div className="tagContainer">
            <AiFillTag></AiFillTag>시사
          </div>
        </div>
        <div className="title">
          <h3>{title}</h3>
        </div>
        <div className="user">
          {/* {' '}
          <div className="userContainer">
            <IconContext.Provider value={{ size: '30px' }}>
              <BiUserCircle></BiUserCircle>
            </IconContext.Provider>{' '}
            개발짱짱맨
          </div> */}
        </div>
        <div className="content ellipsis">{content}</div>

        <div className="tag">#NGO #환경보호 #크라우드펀딩</div>
        <div className="comment">
          <BiCommentDetail></BiCommentDetail> 3<AiOutlineHeart></AiOutlineHeart>{' '}
          11
        </div>
      </div>
    </>
  );
}

export default function ListContainer() {
  return (
    <>
      <div className="listContainer">
        {' '}
        <Container></Container>
        <Container></Container>
        <Container></Container>
      </div>
    </>
  );
}
