import { actions } from "../actions/types";

const initialState = { alumnosMateria:[],alumnosExamen:[]};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.inscripcionesExamen:
      return {
        ...state,
        alumnosExamen: action.payload,
      };
    case actions.inscripcionesMateria:
      return {
        ...state,
        alumnosMateria: action.payload,
      };
     
    default:
      return state;
  }
}
