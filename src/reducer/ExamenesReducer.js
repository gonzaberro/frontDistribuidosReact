import { actions } from "../actions/types";

const initialState = {
  examenes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.setExamenesUsuario:
      return {
        ...state,
        examenes: action.payload,
      };
    

    default:
      return state;
  }
}
