import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '../../App';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getBoards } from '../../api';

interface StyledArticleWrapperProps {
  boardcolor: string;
}
const StyledArticleWrapper = styled.div<StyledArticleWrapperProps>`
  width: 100%;
  color:  color: rgb(72, 63, 63);
  display: flex;
  flex-direction: column;
  align-items: center;
  & li {
    list-style: none;
    border-bottom: 0.3px solid rgb(222, 222, 222);
    height: 6rem;
    margin :0;
  }
  & .articles {
    cursor : pointer;
    margin-top : 2rem;
    margin-bottom : 3rem;
    width: 36rem;
    min-height: 80rem;
    
  }
  @media (max-width: 768px) {
    .articles {
      width: 100%;
    }
  }
  h1{
    text-align : center;
    color : ${(props) => props.boardcolor};
    margin-bottom : 3rem;
  }
  h3{
    margin :0px;
  }
  
  li:hover {
    background-color: rgba(192, 192, 192, 0.7);
  }
`;

export default function BoardBox() {
  const { boardName } = useParams();
  console.log('boardName: ', boardName);
  // 각 board별 게시글을 가져온다.

  const articleQuery = useQuery({
    queryKey: ['board', boardName],
    queryFn: () => {
      return axios.get(apiURL + '/board/' + boardName).then((res) => res.data);
    },
  });

  // boards 목록을 가져온다.
  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });
  const boardcolor =
    boardName === 'all'
      ? 'black'
      : boardsQuery.data?.filter((board) => {
          return board.boardName === boardName;
        })[0].boardColor; // boards에서 thread의 boardName과 같은 board의 boardColor를 가져온다.
  console.log('boardcolor: ', boardcolor);
  return (
    <StyledArticleWrapper boardcolor={boardcolor}>
      <div className="articles">
        <h1>{boardName === 'all' ? '전체' : boardName} 게시판</h1>
        {articleQuery.data?.map((thread) => {
          return (
            <li>
              <h3>{thread.title}</h3> <p>{thread.content} </p> <p></p>
            </li>
          );
        })}
      </div>
    </StyledArticleWrapper>
  );
}
