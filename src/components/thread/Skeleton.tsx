import styled from 'styled-components';
import { ThreadBoxWrapper } from './ThreadBox';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const StyledThreadSkeleton = styled(ThreadBoxWrapper)`
  .title {
    width: 25rem;
    margin-top: 3rem;
    height: 2rem;
    background-color: #dddddd;
    border-radius: 0.5rem;
  }
  .review_content {
    background-color: #dddddd;
    border-radius: 0.5rem;
    width: 90%;
    height: 5rem;
  }
  .box {
    width: 7rem;
    height: 100%;
  }
  .author,
  .likedicon {
    display: inline-block;
    width: 7rem;
    height: 2rem;
    background-color: #dddddd;
    border-radius: 0.5rem;
  }
  .commentbox {
    width: 100%;
    background-color: #dddddd;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    height: 6rem;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }
`;

export default function ThreadById_Skeleton() {
  return (
    <StyledThreadSkeleton boardcolor="#dddddd">
      <div className="threadbox">
        <IconContext.Provider value={{ size: '3rem', color: '#dddddd' }}>
          <span className="bookmark">
            <BsFillBookmarkFill></BsFillBookmarkFill>
          </span>
        </IconContext.Provider>
        <div className="reviewbox">
          <div className="titlewrapper">
            <div className="title"> </div>

            <div className="box">
              <span></span>
              <button></button>
              <button></button>
            </div>
          </div>
          <p className="review_content"></p>

          <div className="explanation">
            <span className="author">
              <span style={{ fontWeight: 'bold' }}></span>
            </span>
            <span className="liked">
              <span className="likedicon"></span>
            </span>
          </div>
        </div>

        <div className="comments">
          <div className="commentbox"></div>
          <div className="commentbox"></div>
          <div className="commentbox"></div>
          <div className="commentbox"></div>
        </div>
        <button className="backbutton"></button>
      </div>
    </StyledThreadSkeleton>
  );
}
