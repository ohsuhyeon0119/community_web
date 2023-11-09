import styled from 'styled-components';

export const StyledThreadsWrapper = styled.div`
  width: 100%;
  margin-top: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .threadbox:last-child {
    border-bottom: 1.2px solid rgb(222, 222, 222);
  }

  .threadbox {
    width: 93%;

    cursor: pointer;
    border-top: 1.2px solid rgb(222, 222, 222);

    padding: 0.6rem 0.5rem 0.6rem 0.5rem;
  }
  .threadbox:hover {
    background-color: rgba(217, 217, 227, 0.8);
  }

  .explanation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    height: 2rem;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 800;
    margin-top: 0.5rem;
  }
  .content {
    margin-top: 0.2rem;
    color: #444444;
    padding-right: 30%;
    height: 5rem;
  }

  .date {
    background-color: inherit;
    color: #a6a6a6;
    border: none;
  }

  .liked {
  }
  .comment {
    margin-left: 1rem;
    margin-right: 0.5rem;
  }
  .author {
    margin-left: 0.7rem;
  }
`;

const StyledThreadsSkeletonWrapper = styled(StyledThreadsWrapper)`
  .title {
    width: 10rem;
    background-color: #dddddd;
    border-radius: 0.3rem;
    height: 70%;
  }
  .content {
    span {
      display: inline-block;
      width: 100%;
      background-color: #dddddd;
      border-radius: 0.3rem;
      height: 90%;
    }
  }
  .likedandcommentbox {
    background-color: #dddddd;
    height: 80%;
    width: 5rem;
    border-radius: 0.3rem;
  }
  .authorbox {
    border-radius: 0.3rem;
    background-color: #dddddd;
    height: 80%;
    width: 10rem;
  }
`;

const StyledPhrase = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: inline-block;
    width: 15rem;
    background-color: #dddddd;
    color: #dddddd;
    border-radius: 0.3rem;
  }
`;

export function CountPhrase_Skeleton() {
  return (
    <StyledPhrase>
      <span>''</span>
    </StyledPhrase>
  );
}

export function Threads_Skeleton() {
  return (
    <StyledThreadsSkeletonWrapper>
      <ThreadSkeleton></ThreadSkeleton>
      <ThreadSkeleton></ThreadSkeleton>
      <ThreadSkeleton></ThreadSkeleton>
      <ThreadSkeleton></ThreadSkeleton>
      <ThreadSkeleton></ThreadSkeleton>
      <ThreadSkeleton></ThreadSkeleton>
      <ThreadSkeleton></ThreadSkeleton>
      <ThreadSkeleton></ThreadSkeleton>
      <ThreadSkeleton></ThreadSkeleton>
      <ThreadSkeleton></ThreadSkeleton>
    </StyledThreadsSkeletonWrapper>
  );
}

export function ThreadSkeleton() {
  return (
    <div className="threadbox">
      <div className="explanation">
        <div className="title"></div>
        <div>
          <span className="date"></span>
        </div>
      </div>
      <p className="content">
        <span></span>
      </p>
      <div className="explanation explanation2">
        <div className="authorbox">
          <span className="author"></span>
        </div>
        <div className="likedandcommentbox">
          <span className="liked"></span>
          <span className="comment"></span>
        </div>
      </div>
    </div>
  );
}
