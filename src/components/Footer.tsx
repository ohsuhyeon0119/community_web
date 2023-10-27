import styles from '../pages/ScreenLayout.module.css';
export function Footer() {
  return (
    <div className={styles.Footer}>
      <span>고객센터</span>
      <span> 회사정보</span>
      <span> 연락처</span>
      <span> 홍보용 SNS</span>
      <span> 도움말</span>
      <span>이용약관 </span>
      <span>개인정보 보호 정책</span>
    </div>
  );
}
