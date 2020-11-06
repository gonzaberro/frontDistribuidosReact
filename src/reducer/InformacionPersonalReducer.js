import { actions } from "../actions/types";
const initialState = {
  usuario: {},
  idRol:3,
  idUsuario:5
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.AddUser:
      return {
        ...state,
        usuario: action.payload,
      };
      case actions.setRolUser:
      return {
        ...state,
        idRol: action.payload,
      };

    default:
      return state;
  }
}
