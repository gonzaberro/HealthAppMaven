import {
  SET_FUNCIONES_ASIGNADAS,
  SET_FUNCIONES_DISPONIBLES,
} from "actions/types";
const initialState = {
  funcionesDisponibles: [],
  funcionesAsignadas: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FUNCIONES_ASIGNADAS:
      return {
        ...state,
        funcionesAsignadas: action.payload,
      };
    case SET_FUNCIONES_DISPONIBLES:
      return {
        ...state,
        funcionesDisponibles: action.payload,
      };

    default:
      return state;
  }
}
