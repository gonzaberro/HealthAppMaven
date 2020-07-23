import { SET_PROFESIONAL, SET_LISTA_PROFESIONAL, ERROR_MESSAGE } from "./types";
import { url_servidor, error_generico } from "Utils/constants";

export function setProfesional(profesional) {
  return (dispatch) => {
    dispatch({
      type: SET_PROFESIONAL,
      payload: profesional,
    });
  };
}

export function eliminarProfesional(dni) {
  return (dispatch) => {
    fetch(`${url_servidor}profesional/${dni}`, {
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
                " al intentar eliminar el profesional"
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_LISTA_PROFESIONAL,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se eliminó el profesional",
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

export function getListaProfesionales() {
  return (dispatch) => {
    fetch(`${url_servidor}profesional`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_PROFESIONAL,
          payload: data,
        })
      );
  };
}
