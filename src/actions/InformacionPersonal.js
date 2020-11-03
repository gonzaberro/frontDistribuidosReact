import { actions } from "./types";

export function setUsuario(usuario) {
  return (dispatch) => {
    dispatch({
      type: actions.AddUser,
      payload: usuario
    });
  };
}
