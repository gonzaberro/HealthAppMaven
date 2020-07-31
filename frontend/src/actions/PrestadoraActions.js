import { SET_PRESTADORA, SET_LISTA_PRESTADORA, ERROR_MESSAGE } from "./types";
import { url_servidor, error_generico } from "Utils/constants";

export function setPrestadora(prestadora) {
  //Set de la obraSocial que quiero editar
  return (dispatch) => {
    dispatch({
      type: SET_PRESTADORA,
      payload: prestadora,
    });
  };
}

export function getPrestadoras() {
  return (dispatch) => {
    fetch(url_servidor + "prestadora", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_PRESTADORA,
          payload: data,
        })
      );
  };
}

export function eliminarPrestadora(cd_prestadora) {
  return (dispatch) => {
    fetch(url_servidor + "prestadora/" + cd_prestadora, {
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
                " al intentar eliminar la prestadora"
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_LISTA_PRESTADORA,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se eliminó la prestadora",
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
