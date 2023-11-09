import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

interface ExplanationWrapperProps {
  $isshown: string;
}

const ExplanationWrapper = styled.div<ExplanationWrapperProps>`
  height: 90vh;
  display: flex;
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
`;

export function Explanation() {
  const [isshown, setIsshown] = useState('');

  const { ref, inView } = useInView({
    threshold: 0.6,
  });

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
      <p ref={ref} className={`explanation`}>
        <span>세</span>상의 <span>모</span>든 것들에 <br />
        <span className="letter_re">리</span>뷰를 남겨보세요 <br /> 당신의
        의견이 다른 사람들에게 큰 도움이 됩니다.
      </p>
    </ExplanationWrapper>
  );
}
