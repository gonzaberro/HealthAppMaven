import { SET_PACIENTE, SET_LISTA_PACIENTE, ERROR_MESSAGE } from "./types";
import { url_servidor, error_generico } from "Utils/constants";

export function setPaciente(paciente) {
  return (dispatch) => {
    dispatch({
      type: SET_PACIENTE,
      payload: paciente,
    });
  };
}

export function eliminarPaciente(dni) {
  return (dispatch) => {
    fetch(`${url_servidor}paciente/${dni}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            response.status !== 500
              ? error_generico
              : "Error " + response.status + " al intentar eliminar el paciente"
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_LISTA_PACIENTE,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se eliminó el paciente",
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

export function getListaPacientes() {
  return (dispatch) => {
    fetch(`${url_servidor}paciente`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_PACIENTE,
          payload: data,
        })
      );
  };
}
