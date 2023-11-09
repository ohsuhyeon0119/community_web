import { useEffect } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import type { Board } from '../../type/type';
import { AiOutlineUp } from 'react-icons/ai';

interface SelectBoxProps {
  isSelectboxClicked: boolean;
  setIsSelectboxClicked: (value: boolean) => void;
  clickedBoard: string | null;
  setClickedBoard: (value: string) => void;
  boards: Board[] | null;
  setBoardcolor: (value: string) => void;
}
export function SelectBox({
  isSelectboxClicked,
  setIsSelectboxClicked,
  clickedBoard,
  setClickedBoard,
  boards,
  setBoardcolor,
}: SelectBoxProps) {
  useEffect(() => {
    window.addEventListener('click', () => {
      setIsSelectboxClicked(false);
    });
    return () => {
      window.removeEventListener('click', () => {
        setIsSelectboxClicked(false);
      });
    };
  }, []);

  return (
    <IconContext.Provider value={{ size: '2em', color: 'gray' }}>
      <div className={'selectWrapper'}>
        <div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              // 부모 요소와 클릭이벤트를 분리
              setIsSelectboxClicked(!isSelectboxClicked);
            }}
            className={'selectBox'}
          >
            <span>
              {!!clickedBoard ? clickedBoard : '게시판을 선택해 주세요.'}{' '}
            </span>
            <span className="updownIcon">
              {isSelectboxClicked ? (
                <AiOutlineUp> </AiOutlineUp>
              ) : (
                <AiOutlineDown></AiOutlineDown>
              )}
            </span>
          </div>
          <div className={'selectList'}>
            {isSelectboxClicked &&
              boards?.map((board, i) => {
                return (
                  <div
                    onClick={() => {
                      if (!!boards) {
                        const clickedBoardColor = board.boardColor;
                        console.log('clickedBoardColor : ', clickedBoardColor);
                        setBoardcolor(clickedBoardColor || '');
                        // POST할 데이터 객체
                        console.log('clickedboardcolor : ', clickedBoardColor);
                        setClickedBoard(board.boardName);
                        // 선택한 board의 색깔을 검색
                      }
                    }}
                    key={i}
                    className={'selectItem'}
                  >
                    {board.boardName}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
