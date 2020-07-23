import { SET_SERVICIO, SET_LISTA_SERVICIOS, ERROR_MESSAGE } from "./types";
import { url_servidor, error_generico } from "Utils/constants";

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
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            response.status !== 500
              ? error_generico
              : "Error " + response.status + " al intentar eliminar el servicio"
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_LISTA_SERVICIOS,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se eliminó el servicio",
            tipo: "success",
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR_MESSAGE,
          payload: { message: error.message, tipo: "error" },
        });
      });
  };
}
export function getListaServicios() {
  return (dispatch) => {
    fetch(url_servidor + "servicio", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
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
