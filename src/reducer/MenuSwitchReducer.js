import { actions, MenuOptions } from "../actions/types";

const initialState = {
  menuSelected: MenuOptions.CargarNotas,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.MenuSwitch:
      return {
        ...state,
        menuSelected: action.payload,
      };

    default:
      return state;
  }
}
