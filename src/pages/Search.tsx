import styled from 'styled-components';
import { BiSearchAlt2 } from 'react-icons/bi';
const SearchWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  input {
    width: 30rem;
    height: 3rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #dddddd;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
    padding-left: 3.2rem;
  }
  input:focus {
    border: 0.1rem solid black;
  }
  .inputBox {
    position: relative;
  }
  .icon {
    font-size: 2.5rem;
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
  }
  .SearchedBox {
    width: 100%;
    height: 30rem;
  }
`;
export default function Search() {
  return (
    <SearchWrapper>
      <div className="inputBox">
        <input type="text" placeholder="제목 또는 내용을 검색하세요" />
        <span className="icon">
          <BiSearchAlt2></BiSearchAlt2>
        </span>
      </div>
      <div className="SearchedBox"></div>
    </SearchWrapper>
  );
}
