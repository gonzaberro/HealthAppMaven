import { SET_PACIENTE, SET_LISTA_PACIENTE } from "./types";
import { url_servidor } from "Utils/constants";

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
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_LISTA_PACIENTE,
          payload: data,
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
