import {
  BUSCAR_TURNOS,
  BUSCAR_PROFESIONAL,
  BUSCAR_PACIENTE,
  BUSCAR_ACTUALES,
  CLEAN_BUSCAR_TURNOS,
} from "../actions/types";

const initialState = {
  turnos: [],
  profesional: 0,
  paciente: 0,
  actuales: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BUSCAR_TURNOS:
      return {
        ...state,
        turnos: action.payload,
      };
    case BUSCAR_PROFESIONAL:
      return {
        ...state,
        profesional: action.payload.dni,
        actuales: action.payload.actuales,
      };
    case BUSCAR_PACIENTE:
      return {
        ...state,
        paciente: action.payload.dni,
        actuales: action.payload.actuales,
      };

    case BUSCAR_ACTUALES:
      return {
        ...state,
        actuales: action.payload,
      };
    case CLEAN_BUSCAR_TURNOS:
      return {
        ...state,
        turnos: [],
        profesional: 0,
        paciente: 0,
        actuales: 1,
      };

    default:
      return state;
  }
}
