import {
  BUSCAR_TURNOS,
  BUSCAR_PACIENTE,
  BUSCAR_PROFESIONAL,
  CLEAN_BUSCAR_TURNOS,
  ERROR_MESSAGE,
  SET_ESTADOS_TURNO,
} from "./types";
import { url_servidor, error_generico } from "Utils/constants";
import { prestadora } from "Utils/functions";

export function setBuscarPaciente(dni, actuales) {
  return (dispatch) => {
    dispatch({
      type: BUSCAR_PACIENTE,
      payload: { dni: dni, actuales: actuales },
    });
  };
}

export function setBuscarProfesional(dni, actuales) {
  return (dispatch) => {
    dispatch({
      type: BUSCAR_PROFESIONAL,
      payload: { dni: dni, actuales: actuales },
    });
  };
}

export function getPacientes(filterBuscar) {
  return (dispatch) => {
    fetch(url_servidor + "turnos/paciente/" + prestadora(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(filterBuscar),
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: BUSCAR_TURNOS,
          payload: data,
        })
      )
      .catch(() => {
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: error_generico,
            tipo: "error",
          },
        });
      });
  };
}

export function cleanTurnos() {
  return (dispatch) => {
    dispatch({
      type: CLEAN_BUSCAR_TURNOS,
    });
  };
}
export function setEstadosTurno(estados) {
  return (dispatch) => {
    dispatch({
      type: SET_ESTADOS_TURNO,
      payload: estados,
    });
  };
}

export function buscarTurnosProfesinal(filterBuscar) {
  return (dispatch) => {
    fetch(url_servidor + "turnos/profesional/" + prestadora(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(filterBuscar),
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: BUSCAR_TURNOS,
          payload: data,
        })
      )
      .catch(() => {
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: error_generico,
            tipo: "error",
          },
        });
      });
  };
}
