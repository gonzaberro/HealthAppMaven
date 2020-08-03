import {
  SET_TURNOS_VISTA_MENSUAL,
  SET_TURNOS_VISTA_SEMANAL,
  ERROR_MESSAGE,
} from "./types";
import { url_servidor, error_generico } from "Utils/constants";
import { prestadora } from "Utils/functions";

export function getTurnosMensual(fecha, profesional) {
  //fecha en formato yyyy-MM-dd
  return (dispatch) => {
    fetch(
      url_servidor +
        "turnos/mes/" +
        prestadora() +
        "/" +
        profesional +
        "/" +
        fecha,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_TURNOS_VISTA_MENSUAL,
          payload: data,
        });
      })
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

export function getTurnosSemana(fecha, profesional) {
  //fecha en formato yyyy-MM-dd
  return (dispatch) => {
    fetch(
      url_servidor +
        "turnos/semana/" +
        prestadora() +
        "/" +
        profesional +
        "/" +
        fecha,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_TURNOS_VISTA_SEMANAL,
          payload: data,
        });
      })
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
