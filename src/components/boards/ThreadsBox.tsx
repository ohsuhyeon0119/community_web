import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '../../App';
import styled from 'styled-components';
import type { Thread } from '../../type/type';
import { useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import PagenationBox from './PaginationBox';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { getPassedTime, getlimitedString } from '../../utils/utils';
import { FaRegUser } from 'react-icons/fa';
import {
  StyledThreadsWrapper,
  CountPhrase_Skeleton,
  Threads_Skeleton,
} from './Skeleton';

const StyledThreadsBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  h1 {
    margin: 0rem;
    margin-top: 6rem;
    margin-bottom: 6rem;
    text-align: center;
  }
`;

export default function ThreadsBox() {
  const navi = useNavigate();
  const { pathname, search } = useLocation();

  const params = useParams();
  const boardName = params.boardName;
  const [searchParams] = useSearchParams();
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
  const isLoading_threads = threadsInBoardQuery.isLoading;
  const isLoading_count = countQuery.isLoading;

  return (
    <>
      <StyledThreadsBoxWrapper>
        <h1>{boardName === 'all' ? '전체 글 보기' : `${boardName} 게시판`} </h1>

        {isLoading_count ? (
          <CountPhrase_Skeleton></CountPhrase_Skeleton>
        ) : (
          <p style={{ textAlign: 'center' }}>
            {boardName === 'all' ? '전체 글' : `${boardName} 게시판`}에는{' '}
            {count}
            개의 리뷰가 있습니다
          </p>
        )}

        {isLoading_threads ? (
          <Threads_Skeleton></Threads_Skeleton>
        ) : (
          <StyledThreadsWrapper>
            {threads.map((thread: Thread) => {
              return (
                <div
                  className="threadbox"
                  onClick={() => {
                    navi('/thread/' + thread.id.toString(), {
                      state: { pathname, search },
                    });
                  }}
                >
                  <div className="explanation">
                    <div className="title"> {thread.title}</div>
                    <div>
                      <span className="date">{getPassedTime(thread.date)}</span>
                    </div>
                  </div>
                  <p className="content">{getlimitedString(thread.content)}</p>

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
          </StyledThreadsWrapper>
        )}
      </StyledThreadsBoxWrapper>
      <PagenationBox
        {...{ pageOffset, setpageOffset, pageIdList, count }}
      ></PagenationBox>
    </>
  );
}
