import { SET_SERVICIO, SET_LISTA_SERVICIOS } from "./types";
import { url_servidor } from "Utils/constants";

export function setServicio(servicio) {
  //Set de la obraSocial que quiero editar
  return (dispatch) => {
    dispatch({
      type: SET_SERVICIO,
      payload: servicio,
    });
  };
}

export function eliminarServicio(cd_servicio) {
  return (dispatch) => {
    fetch(url_servidor + "servicio/" + cd_servicio, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_SERVICIOS,
          payload: data,
        })
      );
  };
}
export function getListaServicios() {
  return (dispatch) => {
    fetch(url_servidor + "servicio", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_SERVICIOS,
          payload: data,
        })
      );
  };
}
