import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '../../App';
import styled from 'styled-components';

const StyledArticleWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  & li {
    list-style: none;
    border: 0.3px solid black;
    height: 6rem;
  }
  & .articles {
    width: 36rem;
  }
  @media (max-width: 768px) {
    .articles {
      width: 100%;
    }
  }
`;

export default function BoardBox() {
  const articleQuery = useQuery({
    queryKey: ['board', 'all'],
    queryFn: () => {
      return axios.get(apiURL + '/board/all').then((res) => res.data);
    },
  });
  return (
    <StyledArticleWrapper>
      <div className="articles">
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
