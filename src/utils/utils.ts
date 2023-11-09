export function getPassedTime(target: string) {
  const currentTime = new Date();

  const targetTime = new Date(target);

  const timeDifference = currentTime.getTime() - targetTime.getTime();

  const minutes = Math.floor(timeDifference / 1000 / 60);
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  if (minutes < 60) {
    if (minutes < 1) return `방금 전`;
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
}
export function setTokenWithExpiry(token: string) {
  const now = new Date();
  const item = {
    value: token,
    expiry: now.getTime() + 60 * 60 * 1000, // 현재 시간에 분을 더해 만료 시간 설정
  };
  localStorage.setItem('token', JSON.stringify(item));
}
export function getToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }
  const item = JSON.parse(token);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(token);
    return null;
  }
  return item.value; //전역으로 관리하는 token은 string이어야 한다.
}

export function getlimitedString(content: string) {
  const str = content.substring(0, 100);
  if (str.length < 100) return str;
  return str + '...';
}
