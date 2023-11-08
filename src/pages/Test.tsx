import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../App';
import styled from 'styled-components';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { animateScroll as scroll } from 'react-scroll';
import { useSearchParams } from 'react-router-dom';
import { Thread } from '../type/type';
interface buttonWrapperProps {
  clicked: string;
}
const ButtonWrapper = styled.div<buttonWrapperProps>`
  button {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin: 1rem;
    border: none;
    background-color: #e8e8e8;
    cursor: pointer;

    background-color: ${(props) =>
      props.clicked === 'clicked' ? `#0074e4` : ''};
  }
`;
const PaginationBoxWrapper = styled.div`
  width: 100%;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;

    .caret {
      font-size: 1.5rem;
      color: gray;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;
export default function Test() {
  const [searchParams, setSearchParams] = useSearchParams();

  //현재 페이지의 id. 백엔드에 넘겨줄 state

  // 페이지 버튼의 번호 1~5 , 6~10 , 11~15.. 씩 끊어주는 offset state
  const [pageOffset, setpageOffset] = useState<number>(1);
  const pageIdList = [
    pageOffset,
    pageOffset + 1,
    pageOffset + 2,
    pageOffset + 3,
    pageOffset + 4,
  ];

  const pagenum = Number(searchParams.get('pagenum'));
  const boardsQuery = useQuery({
    queryKey: ['boards', pagenum],
    queryFn: () => {
      return axios
        .get(apiURL + `/board/all?pagenum=${pagenum}`)
        .then((res) => res.data);
    },
  });
  const countQuery = useQuery({
    queryKey: ['boards', 'count'],
    queryFn: () => {
      return axios.get(apiURL + `/count/all`).then((res) => res.data);
    },
  });
  const count = countQuery.data?.count;
  const boards = boardsQuery.data;

  useEffect(() => {
    console.log('countQuery.data: ', countQuery.data);
  }, [countQuery.data]);
  return (
    <>
      {boards &&
        count && ( // data가 다 받아와지면 렌더링
          <>
            <h1>{count}개의 글이 있습니다.</h1>
            <p></p>
            {boards.map((thread: Thread) => {
              return <li>{thread.title}</li>;
            })}
            <PaginationBoxWrapper>
              <div>
                <span
                  onClick={() => {
                    if (pageOffset === 1) {
                      return;
                    }
                    setpageOffset(pageOffset - 5);
                  }}
                  className="caret caret-left"
                >
                  <BsFillCaretLeftFill></BsFillCaretLeftFill>
                </span>
                {pageIdList.map((pageid_in_button) => {
                  const clicked = pageid_in_button === pagenum ? 'clicked' : '';
                  const visibility =
                    pageid_in_button < countQuery.data.count / 10;

                  return (
                    <ButtonWrapper clicked={clicked}>
                      <button
                        style={{
                          visibility: visibility ? 'visible' : 'hidden',
                        }}
                        onClick={() => {
                          searchParams.set(
                            'pagenum',
                            pageid_in_button.toString()
                          );
                          setSearchParams(searchParams);

                          scroll.scrollToTop({ smooth: true, duration: 300 });
                        }}
                      >
                        {pageid_in_button}
                      </button>
                    </ButtonWrapper>
                  );
                })}

                <span
                  onClick={() => {
                    if (pageOffset + 5 > countQuery.data.count / 10) {
                      // document 갯수보다 더 많은 경우
                      return;
                    }
                    setpageOffset(pageOffset + 5);
                  }}
                  className="caret caret-right"
                >
                  <BsFillCaretRightFill></BsFillCaretRightFill>
                </span>
              </div>
            </PaginationBoxWrapper>
          </>
        )}
    </>
  );
}
