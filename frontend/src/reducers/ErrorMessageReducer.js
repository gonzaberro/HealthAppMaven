import { ERROR_MESSAGE } from "../actions/types";

const initialState = {
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
