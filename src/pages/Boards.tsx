import styled from 'styled-components';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '../App';
import { getBoards } from '../api';
import { useState, useEffect } from 'react';
import { AiOutlineCaretLeft } from 'react-icons/ai';
import { AiOutlineCaretRight } from 'react-icons/ai';

interface StyledBoardsWrapperProps {
  carouselindex: number;
}
const StyledBoardsWrapper = styled.div<StyledBoardsWrapperProps>`
  & .Boards {
    display: flex;
    flex-direction: row;
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0px;
    justify-content: space-around;
    align-items: center;
    height: 4rem;
    width: 100%;
    text-align: center;
    border-bottom: 1.3px solid rgb(222, 222, 222);
    text-decoration: none;
    color: black;
  }
  h1 {
    text-align: center;
  }
  .slide {
    position: relative;

    z-index: 100;
  }

  @media (max-width: 768px) {
    & .Boards {
      top: 3rem;
    }
    .slide {
      font-size: 0.8rem;
    }
  }

  .carousel-container {
    width: 80%;
    overflow: hidden;
    position: relative;
  }

  .carousel {
    display: flex;
    flex-direction: row;
    width: 200%;
    transition: transform 0.5s ease; /* 슬라이딩 효과를 위한 transition 설정 */
  }

  .prev-button,
  .next-button {
    background-color: white;
    border: none;
  }
  .prev-button {
  }
  .next-button {
  }
  .transform {
    transform: ${(props) => {
      return `translateX(-${props.carouselindex * 10 + '%'})`;
    }};
  }
`;

interface StyledNavLinkWrapperProps {
  boardcolor: string;
}
const StyledNavLinkWrapper = styled.div<StyledNavLinkWrapperProps>`
  width: 20%;
  & .active {
    font-weight: bold;
    color: ${(props) => props.boardcolor};
    font-size: 1.4rem;
  }
  .slide {
    width: 100%;
  }

  @media (max-width: 768px) {
    & .slide {
      font-size: 0.8rem;
    }
    & .active {
      font-weight: bold;
      color: ${(props) => props.boardcolor};
      font-size: 1rem;
    }
  }
`;

export default function Boards() {
  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <StyledBoardsWrapper carouselindex={carouselIndex}>
      <h1>B O A R D S</h1>

      <div className={'Boards'}>
        <button
          onClick={() => {
            if (carouselIndex > 0) {
              setCarouselIndex(carouselIndex - 1);
            }
          }}
          className="prev-button"
        >
          <AiOutlineCaretLeft></AiOutlineCaretLeft>
        </button>
        <div className="carousel-container">
          <div className={`carousel transform`}>
            <StyledNavLinkWrapper boardcolor="black">
              <NavLink
                style={{ textDecoration: 'none' }}
                className={({ isActive }) =>
                  isActive ? 'active slide' : 'slide'
                }
                to={'all'}
              >
                전체 글
              </NavLink>
            </StyledNavLinkWrapper>
            {boardsQuery.data?.map((board) => {
              return (
                <StyledNavLinkWrapper boardcolor={board.boardColor as string}>
                  <NavLink
                    style={{ textDecoration: 'none' }}
                    to={`${board.boardName}`}
                    className={({ isActive }) =>
                      isActive ? 'active slide' : 'slide'
                    }
                  >
                    {board.boardName}
                  </NavLink>
                </StyledNavLinkWrapper>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            if (carouselIndex < 5) {
              setCarouselIndex(carouselIndex + 1);
            }
          }}
          className="next-button"
        >
          <AiOutlineCaretRight></AiOutlineCaretRight>
        </button>
      </div>

      <Outlet />
    </StyledBoardsWrapper>
  );
}
