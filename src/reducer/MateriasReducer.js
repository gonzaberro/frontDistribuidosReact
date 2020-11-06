import { actions } from "../actions/types";

const initialState = {
  materias: [],
  materiaSeleccionada:{},
   docentes:[],
  searchField:"",
  alumnos:[]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.setMateriasUser:
      return {
        ...state,
        materias: action.payload,
      };
      case actions.setMateriaSeleccionada:
      return {
        ...state,
        materiaSeleccionada: action.payload,
      };
       case actions.searchFieldMateria:
      return {
        ...state,
        searchField: action.payload,
      };

      case actions.listaDocentes:
        return {
          ...state,
          docentes: action.payload,
        };
      case actions.alumnosMateria:
        return {
          ...state,
          alumnos: action.payload,
        };


    default:
      return state;
  }
}
