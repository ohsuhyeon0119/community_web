const TITLE_CHANGE = 'TITLE_CHANGE';
const CONTENT_CHANGE = 'CONTENT_CHANGE';
// action creator
export function ChangeTitle(title: string) {
  return {
    type: TITLE_CHANGE,
    payload: title,
  };
}
export function ChangeContent(content: string) {
  return {
    type: CONTENT_CHANGE,
    payload: content,
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
    case CONTENT_CHANGE:
      return { ...state, content: action.payload };
  }
}
