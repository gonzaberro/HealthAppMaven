import { SET_LOGIN } from "../actions/types";

const initialState = {
  login: 1, // 0 significa que no estoy logueado en el sistema
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
      };

    default:
      return state;
  }
}
