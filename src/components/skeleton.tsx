import styled from 'styled-components';

import { Skeleton } from '@mui/material';

const StyledBoxWrapper = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 95%;
  margin: 0.5rem;

  .titlebox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    span:nth-child(1) {
      height: 1rem;
      width: 15rem;
    }
    span:nth-child(2) {
      height: 1rem;
      width: 5rem;
    }
  }
  .commentbox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.8rem;
    span:nth-child(1) {
      height: 1rem;
      width: 5rem;
    }
    span:nth-child(2) {
      height: 1rem;
      width: 5rem;
    }
  }
`;

const StyledThreadsWrapper = styled.div`
  width: 100%;
  display: center;
  flex-direction: column;
  align-items: center;
  .count {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export function Threads_Skeleton() {
  return (
    <StyledThreadsWrapper>
      <div className="count">
        <Skeleton variant="text" width={'16rem'} height={'2.5rem'} />
      </div>
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
    </StyledThreadsWrapper>
  );
}

export function ThreadSkeleton() {
  return (
    <StyledBoxWrapper>
      <div className="titlebox">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>

      <Skeleton variant="rounded" width={'100%'} height={'3rem'} />
      <div className="commentbox">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </StyledBoxWrapper>
  );
}
