import {
  EDIT_DOCTOR,
  EDIT_FECHA,
  EDIT_HORARIO,
  EDIT_PACIENTE,
  EDIT_PROGRAMAR,
  EDIT_SERVICIO,
  EDIT_ALL,
  EDIT_NOTA,
} from "../actions/types";

export function setProgramar(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_PROGRAMAR,
      payload: data,
    });
  };
}
export function setServicio(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_SERVICIO,
      payload: data,
    });
  };
}

export function setNota(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_NOTA,
      payload: data,
    });
  };
}

export function setPaciente(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_PACIENTE,
      payload: data,
    });
  };
}
export function setDoctor(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_DOCTOR,
      payload: data,
    });
  };
}
export function setFecha(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_FECHA,
      payload: data,
    });
  };
}
export function setHorario(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_HORARIO,
      payload: data,
    });
  };
}
export function editTurnoComplete(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_ALL,
      payload: data,
    });
  };
}
