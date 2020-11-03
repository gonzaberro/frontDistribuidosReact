import { actions } from "./types";

export function setExamenesUsuario(examenes) {
  return (dispatch) => {
    dispatch({
      type: actions.setExamenesUsuario,
      payload: examenes
    });
  };
}

