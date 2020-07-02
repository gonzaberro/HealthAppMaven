import {
  SET_TIPO,
  SET_REPETIR,
  SET_CANTIDAD,
  SET_ARRAY_DIAS,
  SET_DIA,
  CLEAN_PROGRAMAR,
} from "../actions/types";

export function setTipo(tipo) {
  return (dispatch) => {
    dispatch({
      type: SET_TIPO,
      payload: tipo,
    });
  };
}

export function setRepetir(repetir) {
  return (dispatch) => {
    dispatch({
      type: SET_REPETIR,
      payload: repetir,
    });
  };
}
export function cleanProgramar() {
  return (dispatch) => {
    dispatch({
      type: CLEAN_PROGRAMAR,
    });
  };
}

export function setCantidad(cantidad) {
  return (dispatch) => {
    dispatch({
      type: SET_CANTIDAD,
      payload: cantidad,
    });
  };
}

export function setArrayDias(arrayDias) {
  return (dispatch) => {
    dispatch({
      type: SET_ARRAY_DIAS,
      payload: arrayDias,
    });
  };
}

export function setDia(dia) {
  return (dispatch) => {
    dispatch({
      type: SET_DIA,
      payload: dia,
    });
  };
}
