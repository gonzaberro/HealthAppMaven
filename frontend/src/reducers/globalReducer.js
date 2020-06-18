import { SWITCH_MENU } from "actions/types";
import { menuOptions } from "Utils/constants";
const initialState = {
  menuSelected: menuOptions.PLAN,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWITCH_MENU:
      return {
        ...state,
        menuSelected: action.payload,
      };

    default:
      return state;
  }
}
