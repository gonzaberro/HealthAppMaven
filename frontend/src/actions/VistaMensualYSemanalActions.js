import { SET_TURNOS_VISTA_MENSUAL, SET_TURNOS_VISTA_SEMANAL } from "./types";
import { url_servidor } from "Utils/constants/";

export function getTurnosMensual(fecha, profesional) {
  //fecha en formato yyyy-MM-dd
  return (dispatch) => {
    fetch(url_servidor + "turnos/mes/" + profesional + "/" + fecha, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_TURNOS_VISTA_MENSUAL,
          payload: data,
        });
      });
  };
}

export function getTurnosSemana(fecha, profesional) {
  //fecha en formato yyyy-MM-dd
  return (dispatch) => {
    fetch(url_servidor + "turnos/semana/" + profesional + "/" + fecha, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_TURNOS_VISTA_SEMANAL,
          payload: data,
        });
      });
  };
}
