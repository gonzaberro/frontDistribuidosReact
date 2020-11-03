import { actions } from "./types";

export function setUsuarios(usuarios) {
  return (dispatch) => {
    dispatch({
      type: actions.AddUsuarios,
      payload: usuarios
    });
  };
}
export function setSeleccionarUsuario(usuario) {
  return (dispatch) => {
    dispatch({
      type: actions.setSeleccionarUsuario,
      payload: usuario
    });
  };
}
