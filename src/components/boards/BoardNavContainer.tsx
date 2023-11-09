import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import type { Board } from '../../type/type';

interface BoardNavContainerProps {
  boards: Board[];
}
export function BoardNavContainer({ boards }: BoardNavContainerProps) {
  const [isMount, setIsMount] = useState<boolean>(false);

  const boardName = useParams().boardName;
  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
      window.scroll(0, 0);
    } else {
      scroll.scrollToTop({ duration: 400 });
    }
  }, [boardName]);

  return (
    <div className="BoardNavContainer">
      <div className="BoardNav">
        <p>
          <span className="boardName">
            <NavLink
              to={'/boards/all?pagenum=1'}
              className={({ isActive }) => (isActive ? 'active' : 'pending')}
            >
              {' '}
              # 전체 글
            </NavLink>
          </span>
        </p>
        {boards?.map((board, i) => {
          console.log(board);
          return (
            <p key={i}>
              <span className="boardName">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'active' : 'pending'
                  }
                  to={'/boards/' + board.boardName + '?pagenum=1'}
                >
                  #{board.boardName}
                </NavLink>
              </span>
              {board.icon}
            </p>
          );
        })}
      </div>
    </div>
  );
}
