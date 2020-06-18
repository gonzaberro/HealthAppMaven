import { SET_TIPO_SERVICIO, SET_LISTA_TIPO_SERVICIO } from "./types";
import { url_servidor } from "Utils/constants";

export function setTipoServicio(servicio) {
  //Set de la obraSocial que quiero editar
  return (dispatch) => {
    dispatch({
      type: SET_TIPO_SERVICIO,
      payload: servicio,
    });
  };
}

export function eliminarTipoServicio(cd_tipo_servicio) {
  return (dispatch) => {
    fetch(url_servidor + "tipoServicio/" + cd_tipo_servicio, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_TIPO_SERVICIO,
          payload: data,
        })
      );
  };
}
export function getListaTipoServicios() {
  return (dispatch) => {
    fetch(url_servidor + "tipoServicio", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_TIPO_SERVICIO,
          payload: data,
        })
      );
  };
}
