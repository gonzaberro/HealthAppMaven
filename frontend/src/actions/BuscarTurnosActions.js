import { BUSCAR_TURNOS, BUSCAR_PACIENTE, BUSCAR_PROFESIONAL } from "./types";
import { url_servidor } from "Utils/constants";

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

export function buscarTurnosPaciente(dni, activos) {
  return (dispatch) => {
    fetch(url_servidor + "turnos/paciente/" + dni + "/" + activos, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: BUSCAR_TURNOS,
          payload: data,
        })
      );
  };
}

export function cleanTurnos() {
  return (dispatch) => {
    dispatch({
      type: BUSCAR_TURNOS,
      payload: [],
    });
  };
}

export function buscarTurnosProfesinal(dni, activos) {
  return (dispatch) => {
    fetch(url_servidor + "turnos/profesional/" + dni + "/" + activos, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: BUSCAR_TURNOS,
          payload: data,
        })
      );
  };
}
