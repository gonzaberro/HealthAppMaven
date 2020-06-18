import {
  EDIT_DOCTOR,
  EDIT_FECHA,
  EDIT_HORARIO,
  EDIT_PACIENTE,
  EDIT_PROGRAMAR,
  EDIT_SERVICIO,
  EDIT_ALL,
  NEW_TURNO,
  BORRAR_TURNO,
  EDIT_NOTA,
} from "../actions/types";

const initialState = {
  doctor: "",
  paciente: "",
  servicio: "",
  programar: 0,
  fecha: "",
  horario: "",
  nota: "",
  index: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EDIT_ALL:
      return {
        ...state,
        doctor: action.payload.doctor,
        fecha: action.payload.fecha,
        horario: action.payload.horario,
        paciente: action.payload.paciente,
        programar: action.payload.programar,
        servicio: action.payload.servicio,
        nota: action.payload.nota,
        index: action.payload.index,
      };

    case NEW_TURNO:
      return {
        ...state,
        doctor: "",
        fecha: "",
        horario: "",
        paciente: "",
        programar: 0,
        servicio: "",
        nota: "",
        index: null,
      };

    case BORRAR_TURNO:
      return {
        ...state,
        doctor: "",
        fecha: "",
        horario: "",
        paciente: "",
        programar: 0,
        servicio: "",
        nota: "",
        index: null,
      };

    case EDIT_DOCTOR:
      return {
        ...state,
        doctor: action.payload,
      };

    case EDIT_NOTA:
      return {
        ...state,
        nota: action.payload,
      };

    case EDIT_FECHA:
      return {
        ...state,
        fecha: action.payload,
      };

    case EDIT_HORARIO:
      return {
        ...state,
        horario: action.payload,
      };

    case EDIT_PACIENTE:
      return {
        ...state,
        paciente: action.payload,
      };

    case EDIT_PROGRAMAR:
      return {
        ...state,
        programar: action.payload,
      };

    case EDIT_SERVICIO:
      return {
        ...state,
        servicio: action.payload,
      };

    default:
      return state;
  }
}
