import { actions } from "../actions/types";

const initialState = {
  usuarios: [],
  usuarioSeleccionado:{}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.AddUsuarios:
      return {
        ...state,
        usuarios: action.payload,
      };
       case actions.setSeleccionarUsuario:
      return {
        ...state,
        usuarioSeleccionado: action.payload,
      };

    default:
      return state;
  }
}
