const ALERT = 'ALERT';
const ALERT_CLOSE = 'ALERT_CLOSE';
const DELETE = 'DELETE';
const DELETE_CLOSE = 'DELETE_CLOSE';

// action creator
export function setAlertClose() {
  return {
    type: ALERT_CLOSE,
  };
}
export function setAlert() {
  return {
    type: ALERT,
  };
}
export function setDelete() {
  return {
    type: DELETE,
  };
}
export function setDeleteClose() {
  return {
    type: DELETE_CLOSE,
  };
}

type State = {
  alertModal_isvisible: boolean;
  deleteModal_isvisible: boolean;
};

type Action = ReturnType<typeof setAlert>;

const initialState = {
  alertModal_isvisible: false,
  deleteModal_isvisible: false,
};

export default function modalReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case ALERT:
      return {
        alertModal_isvisible: true,
        deleteModal_isvisible: false,
      };
    case ALERT_CLOSE:
      return {
        alertModal_isvisible: false,
        deleteModal_isvisible: false,
      };
    case DELETE:
      return {
        alertModal_isvisible: false,
        deleteModal_isvisible: true,
      };
    case DELETE_CLOSE:
      return {
        alertModal_isvisible: false,
        deleteModal_isvisible: false,
      };

    default:
      return state;
  }
}
