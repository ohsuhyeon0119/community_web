import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

interface ExplanationWrapperProps {
  isshown: undefined | string;
}

const ExplanationWrapper = styled.div<ExplanationWrapperProps>`
  & {
    margin-top: 0rem;
    padding: 3rem 2rem 3rem 2rem;
    border-top: '';
    border-bottom: 0.1rem solid rgb(222, 222, 222);
    text-align: center;
    line-height: 3rem;
  }
  & .explanation {
    opacity: 0;
    transition: opacity 2s;
    ${(props) =>
      props.isshown === 'isshown' &&
      css`
        opacity: 1;
      `}
  }
  span {
    color: #eca55d;
    font-size: 3.6rem;
    font-weight: bold;
  }
`;

export function Explanation() {
  const [isshown, setIsshown] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.6,
  });

  // 자신의 boardName에 해당하는 컬러를 가져온다... 그런데 이거는
  // 나중에 변경 필요. 이러면 모든 thread가 api 요청을 하므로

  // inview가 true이면 isShown을 true로 바꾸고 그걸 유지
  useEffect(() => {
    console.log('inview :', inView);
    if (inView) {
      setIsshown(true);
      console.log('isshown :', isshown);
    }
  }, [inView]);

  return (
    <ExplanationWrapper isshown={isshown ? 'isshown' : undefined}>
      <p ref={ref} className={`explanation`}>
        이<span>세</span>상 <span>모</span>든 것들에 대한 <span>리</span>에서
        당신이 사용한 상품에 대한 리뷰를 남겨보세요. 당신의 의견이 다른
        사람들에게 큰 도움이 됩니다.
      </p>
    </ExplanationWrapper>
  );
}
