const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const INIT = 'INIT'; // 새로고침 시, 로컬 스토리지에 값이 있는지를 확인한다.

// action creator
export function setLogin(token: string) {
  return {
    type: LOGIN,
    payload: token,
  };
}
export function setLogout() {
  return {
    type: LOGOUT,
  };
}
export function init() {
  return {
    type: INIT,
  };
}

type State = { isLoggedIn: boolean; token: string | null };

type Action = ReturnType<typeof setLogin>;

const initialState = { isLoggedIn: false, token: null };

function setTokenWithExpiry(token: string) {
  const now = new Date();
  const item = {
    value: token,
    expiry: now.getTime() + 60 * 60 * 1000, // 현재 시간에 분을 더해 만료 시간 설정
  };
  localStorage.setItem('token', JSON.stringify(item));
}
function getToken() {
  const token = localStorage.getItem('token');
  console.log('token', token);
  if (!token) {
    return null;
  }
  const item = JSON.parse(token);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(token);
    return null;
  }
  return token;
}

// 로그인된 경우의 user 정보는, 리액트 쿼리에서 따로 관리할 것이다.
export default function loginStateReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case LOGIN:
      setTokenWithExpiry(action.payload);
      return { isLoggedIn: true, token: action.payload };

    case LOGOUT:
      localStorage.removeItem('token');
      return { isLoggedIn: false, token: null };
    case INIT:
      // 초기화 또는 TOKEN값을 갖고 올때 항상 초기화 해야 한다(스토리지 만료 여부 확인 위해서)
      const token = getToken();
      if (token !== null) {
        return { isLoggedIn: true, token: token };
      } else {
        return { isLoggedIn: false, token: null };
      }

    default:
      return state;
  }
}
