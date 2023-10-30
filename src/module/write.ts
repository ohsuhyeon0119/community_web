const TITLE_CHANGE = 'TITLE_CHANGE';

// action creator
export function ChangeTitle(title: string) {
  return {
    type: TITLE_CHANGE,
    payload: title,
  };
}

type State = { title: string; content: string };
type Action = ReturnType<typeof ChangeTitle>;

const initialState = { title: '', content: '' };

export default function writeReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case TITLE_CHANGE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
}
