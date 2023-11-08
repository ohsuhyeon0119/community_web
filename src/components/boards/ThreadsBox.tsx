import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '../../App';
import styled from 'styled-components';
import type { Board, Thread } from '../../type/type';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PagenationBox from './PaginationBox';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { getPassedTime, getlimitedString } from '../../utils/utils';
import { FaRegUser } from 'react-icons/fa';
const StyledArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h1 {
    margin: 0rem;
    margin-top: 6rem;
    margin-bottom: 6rem;
  }
  .threads {
    width: 100%;
    margin-top: 0px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .threads > .threadbox:last-child {
    border-bottom: 1.2px solid rgb(222, 222, 222);
  }

  .threadbox {
    width: 93%;

    cursor: pointer;
    border-top: 1.2px solid rgb(222, 222, 222);
    min-height: 6rem;
    padding: 0.6rem 0.5rem 0.6rem 0.5rem;
  }
  .threadbox:hover {
    background-color: rgba(217, 217, 227, 0.8);
  }

  .explanation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }
  .explanation2 {
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.2rem;
    font-weight: 800;
    margin-top: 0.5rem;
  }
  .content {
    margin-top: 0.2rem;
    color: #444444;
    padding-right: 30%;
  }

  .date {
    background-color: inherit;
    color: #a6a6a6;
    border: none;
  }

  .liked {
  }
  .comment {
    margin-left: 1rem;
    margin-right: 0.5rem;
  }
  .author {
    margin-left: 0.7rem;
  }
`;

export default function ThreadsBox() {
  const navi = useNavigate();
  const params = useParams();
  const boardName = params.boardName;
  const [searchParams, setSearchParams] = useSearchParams();
  const pagenum = Number(searchParams.get('pagenum'));

  // 페이지 버튼의 번호 1~5 , 6~10 , 11~15.. 씩 끊어주는 offset state
  const [pageOffset, setpageOffset] = useState<number>(1);
  const pageIdList = [
    pageOffset,
    pageOffset + 1,
    pageOffset + 2,
    pageOffset + 3,
    pageOffset + 4,
  ];

  const threadsInBoardQuery = useQuery({
    queryKey: ['boards', boardName, pagenum],
    queryFn: () => {
      return axios
        .get(apiURL + `/board/${boardName}?pagenum=${pagenum}`)
        .then((res) => res.data);
    },
  });

  const countQuery = useQuery({
    queryKey: ['boards', boardName, 'count'],
    queryFn: () => {
      return axios.get(apiURL + `/count/${boardName}`).then((res) => res.data);
    },
  });
  const count = countQuery.data?.count;
  const threads = threadsInBoardQuery.data;

  return (
    <>
      {
        <>
          <StyledArticleWrapper>
            <h1>
              {boardName === 'all' ? '전체 글 보기' : `${boardName} 게시판`}{' '}
            </h1>
            <p>
              {' '}
              {boardName === 'all' ? '전체 글' : `${boardName} 게시판`}에는{' '}
              {count} 개의 리뷰가 있습니다!
            </p>

            <div className="threads">
              {threads &&
                threads.map((thread: Thread) => {
                  return (
                    <div
                      className="threadbox"
                      onClick={() => {
                        navi('/thread/' + thread.id.toString());
                      }}
                    >
                      <div className="explanation">
                        <div className="title"> {thread.title}</div>
                        <div>
                          <span className="date">
                            {getPassedTime(thread.date)}
                          </span>
                        </div>
                      </div>
                      <p className="content">
                        {getlimitedString(thread.content)}
                      </p>

                      <div className="explanation explanation2">
                        <div>
                          <FaRegUser></FaRegUser>
                          <span className="author">{thread.author}</span>
                        </div>
                        <div>
                          <span className="liked">
                            <AiFillHeart></AiFillHeart>
                            {thread.liked}
                          </span>
                          <span className="comment">
                            <BiSolidCommentDetail></BiSolidCommentDetail>
                            {0}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </StyledArticleWrapper>
          <PagenationBox
            {...{ pageOffset, setpageOffset, pageIdList, count }}
          ></PagenationBox>
        </>
      }
    </>
  );
}
