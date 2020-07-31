import {
  BUSCAR_TURNOS,
  BUSCAR_PACIENTE,
  BUSCAR_PROFESIONAL,
  CLEAN_BUSCAR_TURNOS,
} from "./types";
import { url_servidor } from "Utils/constants";
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

export function getPacientes(dni, activos) {
  return (dispatch) => {
    fetch(
      url_servidor +
        "turnos/paciente/" +
        prestadora() +
        "/" +
        dni +
        "/" +
        activos,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
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
      type: CLEAN_BUSCAR_TURNOS,
      payload: [],
    });
  };
}

export function buscarTurnosProfesinal(dni, activos) {
  return (dispatch) => {
    fetch(
      url_servidor +
        "turnos/profesional/" +
        prestadora() +
        "/" +
        dni +
        "/" +
        activos,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: BUSCAR_TURNOS,
          payload: data,
        })
      );
  };
}
