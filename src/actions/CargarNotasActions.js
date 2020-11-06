import { actions } from "./types";

export function setAlumnosNotasMateria(alumnos) {
  return (dispatch) => {
    dispatch({
      type: actions.setAlumnosMateriaExamen,
      payload: alumnos
    });
  };
}
export function setAlumnosNotasMateriaExamen(alumnos) {
  return (dispatch) => {
    dispatch({
      type: actions.setAlumnosNotasExamen,
      payload: alumnos
    });
  };
}
