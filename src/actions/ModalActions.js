import { actions } from "./types";

export function setModal(open) {
  return (dispatch) => {
    dispatch({
      type: actions.SET_MODAL,
      payload: open,
    });
  };
}
export function modalFunction(funcion) {
  return (dispatch) => {
    dispatch({
      type: actions.modalFunction,
      payload: funcion
    });
  };
}