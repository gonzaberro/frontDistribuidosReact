import { actions } from "../actions/types";

const initialState = {
  examenes: [],
  searchField:"",
  materias:[],
  examenSeleccionado:{}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.setExamenesUsuario:
      return {
        ...state,
        examenes: action.payload,
      };
       case actions.searchFieldExamen:
      return {
        ...state,
        searchField: action.payload,
      };
       case actions.setMateriasExamen:
      return {
        ...state,
        materias: action.payload,
      };
      case actions.seleccionarExamen:
      return {
        ...state,
        examenSeleccionado:action.payload
      }
    

    default:
      return state;
  }
}
