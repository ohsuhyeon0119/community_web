import styled from 'styled-components';

const StyledFooterWrapper = styled.div`
  .Footer {
    display: flex;

    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    text-align: center;
    padding-top: 1rem;
    padding-left: 5rem;
    color: rgb(131, 130, 130);
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export function Footer() {
  return (
    <StyledFooterWrapper>
      <div className={'Footer'}>
        <span>고객센터</span>
        <span> 회사정보</span>
        <span> 연락처</span>
        <span> 홍보용 SNS</span>
        <span> 도움말</span>
        <span>이용약관 </span>
        <span>개인정보 보호 정책</span>
      </div>
    </StyledFooterWrapper>
  );
}
