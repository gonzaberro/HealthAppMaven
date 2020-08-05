import { SET_MODAL } from "actions/types";
const initialState = { open_modal: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        open_modal: action.payload,
      };

    default:
      return state;
  }
}
