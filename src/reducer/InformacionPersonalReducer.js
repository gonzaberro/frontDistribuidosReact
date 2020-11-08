import { actions } from "../actions/types";
const initialState = {
  usuario: {},
  idRol:3,
  idUsuario:6
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.AddUser:
      return {
        ...state,
        usuario: action.payload,
      };
      case actions.setUserLogged:
      return {
        ...state,
        idRol: action.payload.idRol,
         idUsuario: action.payload.idUsuario,
      };

    default:
      return state;
  }
}
