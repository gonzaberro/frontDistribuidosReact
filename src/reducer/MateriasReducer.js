import { actions } from "../actions/types";

const initialState = {
  materias: [],
  horariosMateriaSeleccionada:[]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.setMateriasUser:
      return {
        ...state,
        materias: action.payload,
      };
      case actions.horariosMateriaSeleccionada:
      return {
        ...state,
        horariosMateriaSeleccionada: action.payload,
      };

    default:
      return state;
  }
}
