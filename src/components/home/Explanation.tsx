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

    line-height: 3rem;
  }
  & .explanation {
    transition: opacity 2s;
    opacity: 0;
    ${(props) =>
      props.isshown === 'isshown' &&
      css`
        opacity: 1;
      `}
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
        GETWORLD에서는 정치와 경제, 과학과 기술 등을 아우르는 주제를 자유롭게
        이야기하는 커뮤니티 공간입니다. 전세계에서 일어나는 수많은 이슈에 대해
        당신의 생각을 말해주세요, 타인의 생각을 읽어보세요, 함께 이야기할 때
        우리의 시야는 한층 성장합니다. 우리는 당신이 이 21세기 포럼의 참여자가
        되길 원합니다.
      </p>
    </ExplanationWrapper>
  );
}
