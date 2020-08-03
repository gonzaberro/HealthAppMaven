import {
  SET_TIPO_SERVICIO,
  SET_LISTA_TIPO_SERVICIO,
  ERROR_MESSAGE,
} from "./types";
import { url_servidor, error_generico } from "Utils/constants";

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
              : "Error " +
                response.status +
                " al intentar eliminar el tipo de servicio"
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_LISTA_TIPO_SERVICIO,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se eliminó el tipo de servicio",
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
export function getListaTipoServicios() {
  return (dispatch) => {
    fetch(url_servidor + "tipoServicio", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_TIPO_SERVICIO,
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
