import { setTokenWithExpiry, getToken } from '../utils/utils';

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
export function initLoginState() {
  return {
    type: INIT,
  };
}

type State = {
  isLoggedIn: boolean;
  token: string | null;
};

type Action = ReturnType<typeof setLogin>;

const initialState = {
  isLoggedIn: false,
  token: null,
};

// 로그인된 경우의 user 정보는, 리액트 쿼리에서 따로 관리할 것이다.
export default function loginStateReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case LOGIN:
      setTokenWithExpiry(action.payload);
      return {
        isLoggedIn: true,
        token: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return {
        isLoggedIn: false,
        token: null,
      };
    case INIT:
      // 초기화 또는 TOKEN값을 갖고 올때 항상 초기화 해야 한다(스토리지 만료 여부 확인 위해서)
      const token = getToken();

      if (token !== null) {
        return {
          isLoggedIn: true,
          token: token,
        };
      } else {
        return {
          isLoggedIn: false,
          token: null,
        };
      }

    default:
      return state;
  }
}
