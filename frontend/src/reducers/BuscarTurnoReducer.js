import {
  BUSCAR_TURNOS,
  BUSCAR_PROFESIONAL,
  BUSCAR_PACIENTE,
  BUSCAR_ACTUALES,
  CLEAN_BUSCAR_TURNOS,
  SET_ESTADOS_TURNO,
} from "../actions/types";

const initialState = {
  turnos: [],
  profesional: 0,
  paciente: 0,
  actuales: 1,
  estadoRecepcionado: false,
  estadoAsignado: false,
  estadoAtendido: false,
  estadoCancelado: false,
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
        paciente: 0,
      };
    case BUSCAR_PACIENTE:
      return {
        ...state,
        paciente: action.payload.dni,
        actuales: action.payload.actuales,
        profesional: 0,
      };
    case SET_ESTADOS_TURNO:
      return {
        ...state,
        estadoRecepcionado: action.payload.estadoRecepcionado,
        estadoAsignado: action.payload.estadoAsignado,
        estadoAtendido: action.payload.estadoAtendido,
        estadoCancelado: action.payload.estadoCancelado,
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
        estadoRecepcionado: false,
        estadoAsignado: false,
        estadoAtendido: false,
        estadoCancelado: false,
      };

    default:
      return state;
  }
}
