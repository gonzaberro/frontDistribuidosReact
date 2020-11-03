import { actions } from "./types";

export function setModal(open) {
  return (dispatch) => {
    dispatch({
      type: actions.SET_MODAL,
      payload: open,
    });
  };
}
