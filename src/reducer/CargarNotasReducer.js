import { actions } from "../actions/types";

const initialState = { alumnosNotasMateria:[],alumnosNotasExamen:[]};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.setAlumnosMateriaExamen:
      return {
        ...state,
        alumnosNotasMateria: action.payload,
      };
    case actions.setAlumnosNotasExamen:
      return {
        ...state,
        alumnosNotasExamen: action.payload,
      };
     
    default:
      return state;
  }
}
