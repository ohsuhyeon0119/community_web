import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../module';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../api/api';
interface ExplanationWrapperProps {
  $isshown: string;
}

const ExplanationWrapper = styled.div<ExplanationWrapperProps>`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0rem;

  text-align: center;
  line-height: 3rem;

  & .explanation {
    opacity: 0;
    transform: translateY(5rem);

    transition: all 2.5s;
    ${(props) =>
      props.$isshown === 'isshown' &&
      css`
        transform: translateY(0rem);
        opacity: 1;
      `}
  }
  span {
    color: #eca55d;
    font-size: 6.5rem;
    font-weight: bold;
  }
  .letter_re {
    position: relative;
    top: 10px;
  }
  .username {
    font-size: 2rem;
    margin-top: 8rem;
    text-align: center;
    opacity: 0;

    transition: all 3.5s;
    ${(props) =>
      props.$isshown === 'isshown' &&
      css`
        opacity: 1;
      `}
  }
`;

export function Explanation() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  const [isshown, setIsshown] = useState('');

  const { ref, inView } = useInView({
    threshold: 0.6,
  });
  const token = useSelector(
    (state: RootState) => state.loginStateReducer.token
  );

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      // 이제 모든 요청마다 header에 token을 넣어야 함
      return getUser(token as string);
    },
    enabled: isLoggedIn, //로그인 된 경우에만 쿼리 실행
  });
  const user = userQuery.data;
  // 자신의 boardName에 해당하는 컬러를 가져온다... 그런데 이거는
  // 나중에 변경 필요. 이러면 모든 thread가 api 요청을 하므로

  // inview가 true이면 isShown을 true로 바꾸고 그걸 유지
  useEffect(() => {
    console.log('inview :', inView);
    if (inView) {
      setIsshown('isshown');
    }
  }, [inView]);

  return (
    <ExplanationWrapper $isshown={isshown}>
      <div ref={ref}>
        <p className={`explanation`}>
          <span>세</span>상의 <span>모</span>든 것들에 <br />
          <span className="letter_re">리</span>뷰를 남겨보세요 <br /> 당신의
          의견이 다른 사람들에게 큰 도움이 됩니다.
        </p>
        {isLoggedIn && !!user && (
          <p className="username">{user.username}님, 환영합니다!</p>
        )}
      </div>
    </ExplanationWrapper>
  );
}
