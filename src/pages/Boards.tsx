import styled from 'styled-components';
import { useNavigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '../App';
import { getBoards } from '../api/api';
import { AiOutlineCaretLeft } from 'react-icons/ai';
import { AiOutlineCaretRight } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { ThreadsBoxContainer } from '../components/boards/ThreadsBoxContainer';
import { BoardNavContainer } from '../components/boards/BoardNavContainer';

const StyledBoardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  .ThreadsContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .BoardNavContainer {
    width: 100%;
    height: 100%;
    padding-top: 12rem;
  }
  @media (max-width: 768px) {
    & {
      grid-template-columns: 1fr;
    }
    .BoardNavContainer {
      display: none;
    }
  }
  .BoardNav {
    border-left: 1px solid black;
    padding-left: 1rem;
    position: sticky;
    top: 5rem;
    right: 0px;

    width: 20rem;
    height: 20rem;
  }

  a {
    text-decoration: none;

    cursor: pointer;
  }

  .active {
    font-weight: 800;
    color: black;
  }
  .pending {
    font-weight: none;
    color: #a6a6a6;
  }
`;

export default function Boards() {
  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  const boards = boardsQuery.data;

  return (
    <>
      {!!boards && (
        <StyledBoardsWrapper>
          <ThreadsBoxContainer></ThreadsBoxContainer>
          <BoardNavContainer boards={boards}></BoardNavContainer>
        </StyledBoardsWrapper>
      )}
    </>
  );
}
