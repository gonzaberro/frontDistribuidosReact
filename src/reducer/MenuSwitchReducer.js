import { actions, MenuOptions,loggedStates } from "../actions/types";

const initialState = {
  isLogged:loggedStates.login,
  menuSelected: MenuOptions.InformacionPersonal,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.MenuSwitch:
      return {
        ...state,
        menuSelected: action.payload,
      };
      case actions.setLogged:
      return {
        ...state,
        isLogged: action.payload,
      };


    default:
      return state;
  }
}
