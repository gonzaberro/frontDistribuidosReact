import { actions } from "./types";

export function setMateriasUsuario(materias) {
  return (dispatch) => {
    dispatch({
      type: actions.setMateriasUser,
      payload: materias
    });
  };
}

export function setHorariosMateriaSeleccionada(horarios) {
  return (dispatch) => {
    dispatch({
      type: actions.horariosMateriaSeleccionada,
      payload: horarios
    });
  };
}
