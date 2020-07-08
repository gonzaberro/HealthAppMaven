import { SWITCH_MENU, CLEAN_GLOBAL } from "actions/types";
import { menuOptions } from "Utils/constants";
const initialState = {
  menuSelected: menuOptions.Agenda_SEMANAL,
  limpiar: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWITCH_MENU:
      return {
        ...state,
        menuSelected: action.payload.menu,
        limpiar: action.payload.limpiar,
      };
    case CLEAN_GLOBAL:
      return {
        ...state,
        limpiar: action.payload,
      };
    default:
      return state;
  }
}
