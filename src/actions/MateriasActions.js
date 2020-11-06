import { actions } from "./types";

export function setMateriasUsuario(materias) {
  return (dispatch) => {
    dispatch({
      type: actions.setMateriasUser,
      payload: materias
    });
  };
}

export function setMateriaSeleccionada(materia) {
  return (dispatch) => {
    dispatch({
      type: actions.setMateriaSeleccionada,
      payload: materia
    });
  };
}
export function setSearchFieldMateria(search) {
  return (dispatch) => {
    dispatch({
      type: actions.searchFieldMateria,
      payload: search
    });
  };
}
export function setDocentes(docentes) {
  return (dispatch) => {
    dispatch({
      type: actions.listaDocentes,
      payload: docentes
    });
  };
}
export function setAlumnos(alumnos) {
  return (dispatch) => {
    dispatch({
      type: actions.alumnosMateria,
      payload: alumnos
    });
  };
}



