import {
  SET_OBRA_SOCIAL,
  SET_LISTA_OBRA_SOCIAL,
  ERROR_MESSAGE,
} from "../actions/types";
import { url_servidor, error_generico } from "Utils/constants";
export function setObraSocial(obraSocial) {
  //Set de la obraSocial que quiero editar
  return (dispatch) => {
    dispatch({
      type: SET_OBRA_SOCIAL,
      payload: obraSocial,
    });
  };
}

export function eliminarObraSocial(cd_os) {
  return (dispatch) => {
    fetch(url_servidor + "obraSocial/" + cd_os, {
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
                " al intentar eliminar la obra social"
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_LISTA_OBRA_SOCIAL,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se eliminó la obra social",
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
export function getListaObrasSocial() {
  return (dispatch) => {
    fetch(url_servidor + "obraSocial", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_OBRA_SOCIAL,
          payload: data,
        })
      );
  };
}
