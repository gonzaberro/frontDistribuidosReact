import { actions } from "./types";

export function setInscripcionesExamen(alumnos) {
  return (dispatch) => {
    dispatch({
      type: actions.inscripcionesExamen,
      payload: alumnos
    });
  };
}
export function setInscripcionesMateria(alumnos) {
  return (dispatch) => {
    dispatch({
      type: actions.inscripcionesMateria,
      payload: alumnos
    });
  };
}
