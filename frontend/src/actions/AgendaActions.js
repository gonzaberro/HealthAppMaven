import {
  NEW_TURNO,
  FECHA_AGENDA,
  BORRAR_TURNO,
  SELECT_DIA_MES,
} from "../actions/types";

export function addTurno(turno) {
  return (dispatch) => {
    dispatch({
      type: NEW_TURNO,
      payload: turno,
    });
  };
}
export function setFechaAgenda(fecha) {
  return (dispatch) => {
    dispatch({
      type: FECHA_AGENDA, //Aparece en AgendaReducer
      payload: fecha,
    });
  };
}
export function setDiaMesSeleccionado(fecha) {
  return (dispatch) => {
    dispatch({
      type: SELECT_DIA_MES, //Aparece en AgendaReducer
      payload: fecha,
    });
  };
}

export function borrarTurno(index, horario) {
  return (dispatch) => {
    dispatch({
      type: BORRAR_TURNO, //Aparece en AgendaReducer
      payload: { index: index, horario: horario },
    });
  };
}
