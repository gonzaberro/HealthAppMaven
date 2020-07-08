import {
  FECHA_AGENDA,
  SELECT_DIA_MES,
  SET_HORARIOS,
  SET_TURNOS,
  SELECT_PROFESIONAL,
  ERROR_MESSAGE,
} from "../actions/types";
import { url_servidor } from "Utils/constants/";

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
export function selectProfesionalAgenda(dni) {
  return (dispatch) => {
    dispatch({
      type: SELECT_PROFESIONAL, //Aparece en AgendaReducer
      payload: dni,
    });
  };
}

export function borrarTurno(cdTurno, cleanProgramar, cleanEditTurno, callback) {
  return (dispatch) => {
    fetch(url_servidor + "turno/" + cdTurno, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.status === 200 && callback) {
        cleanProgramar();
        cleanEditTurno();
        callback();

        dispatch({
          type: ERROR_MESSAGE,
          payload: { message: "Se eliminó el turno", tipo: "success" },
        });
      }
    });
  };
}
export function setHorariosAgenda() {
  return (dispatch) => {
    fetch(url_servidor + "prestadora/1/horarios", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_HORARIOS,
          payload: data,
        })
      );
  };
}

export function getTurnos(fecha, profesional) {
  //fecha en formato yyyy-MM-dd
  return (dispatch) => {
    fetch(url_servidor + "turnos/" + profesional + "/" + fecha, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_TURNOS,
          payload: data,
        });
      });
  };
}
