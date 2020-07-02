import {
  SET_TURNOS_VISTA_MENSUAL,
  SET_TURNOS_VISTA_SEMANAL,
} from "../actions/types";

const initialState = {
  turnos: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TURNOS_VISTA_MENSUAL:
      return {
        ...state,
        turnos: action.payload,
      };
    case SET_TURNOS_VISTA_SEMANAL:
      return {
        ...state,
        turnos: action.payload,
      };

    default:
      return state;
  }
}
