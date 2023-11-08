import styled from 'styled-components';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';

interface buttonWrapperProps {
  clicked: string;
}
export const ButtonWrapper = styled.div<buttonWrapperProps>`
  button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin: 1rem;
    border: none;
    background-color: #e8e8e8;
    cursor: pointer;

    background-color: ${(props) => (props.clicked === 'clicked' ? `gray` : '')};
  }
  @media (max-width: 400px) {
    width: 1.5;
    height: 1.5;
  }
`;
export const PaginationBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
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

interface paginationBoxProps {
  pageOffset: number;
  setpageOffset: (value: number) => void;
  pageIdList: number[];

  count: number;
}

export default function PagenationBox({
  pageOffset,
  setpageOffset,
  pageIdList,
  count,
}: paginationBoxProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pagenum = Number(searchParams.get('pagenum'));
  return (
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
        {pageIdList.map((pageid_in_button, i) => {
          const clicked = pageid_in_button === pagenum ? 'clicked' : '';
          const visibility = pageid_in_button <= count / 20 + 1;

          return (
            <ButtonWrapper key={i} clicked={clicked}>
              <button
                style={{
                  visibility: visibility ? 'visible' : 'hidden',
                }}
                onClick={() => {
                  searchParams.set('pagenum', pageid_in_button.toString());
                  setSearchParams(searchParams);

                  window.scrollTo(0, 0);
                }}
              >
                {pageid_in_button}
              </button>
            </ButtonWrapper>
          );
        })}

        <span
          onClick={() => {
            if (pageOffset + 5 > count / 20) {
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
  );
}
