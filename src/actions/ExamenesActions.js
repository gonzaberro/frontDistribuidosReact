import { actions } from "./types";

export function setExamenesUsuario(examenes) {
  return (dispatch) => {
    dispatch({
      type: actions.setExamenesUsuario,
      payload: examenes
    });
  };
}


export function setSearchExamen(search) {
  return (dispatch) => {
    dispatch({
      type: actions.searchFieldExamen,
      payload: search
    });
  };
}
export function setMateriasExamen(materias) {
  return (dispatch) => {
    dispatch({
      type: actions.setMateriasExamen,
      payload: materias
    });
  };
}

