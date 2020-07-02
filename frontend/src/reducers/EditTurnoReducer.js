import {
  EDIT_DOCTOR,
  EDIT_FECHA,
  EDIT_HORARIO,
  EDIT_PACIENTE,
  EDIT_PROGRAMAR,
  EDIT_SERVICIO,
  EDIT_ALL,
  BORRAR_TURNO,
  EDIT_NOTA,
  EDIT_TIPO_SERVICIO,
  EDIT_CD_TURNO,
  SET_DEFAULT,
} from "../actions/types";

const initialState = {
  doctor: "",
  paciente: "",
  servicio: "",
  programar: 0,
  fecha: "",
  horario: "",
  nota: "",
  tipoServicio: "",
  cdTurno: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EDIT_ALL:
      return {
        ...state,
        doctor: action.payload.profesional.dni,
        fecha: action.payload.fecha,
        horario: action.payload.hora,
        paciente: action.payload.paciente.dni,
        servicio: action.payload.servicio.cd_servicio,
        nota: action.payload.notas,
        tipoServicio: action.payload.tipoServicio.cdTipoServicio,
        cdTurno: action.payload.cdTurno,
      };

    case SET_DEFAULT:
      return {
        ...state,
        doctor: "",
        paciente: "",
        servicio: "",
        programar: 0,
        fecha: "",
        horario: "",
        nota: "",
        tipoServicio: "",
        cdTurno: 0,
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
    case EDIT_CD_TURNO:
      return {
        ...state,
        cdTurno: action.payload,
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
    case EDIT_TIPO_SERVICIO:
      return {
        ...state,
        tipoServicio: action.payload,
      };

    default:
      return state;
  }
}
