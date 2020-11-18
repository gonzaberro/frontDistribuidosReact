import { actions } from "./types";

export function setUsuario(usuario) {
  return (dispatch) => {
    dispatch({
      type: actions.AddUser,
      payload: usuario
    });
  };
}


export function setUserLogged(usuario) {
  return (dispatch) => {
    dispatch({
      type: actions.setUserLogged,
      payload: usuario
    });
  };
}
export function setAnaliticoUsuario(analitico) {
  return (dispatch) => {
    dispatch({
      type: actions.analiticoUsuario,
      payload: analitico
    });
  };
}
