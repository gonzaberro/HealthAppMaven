import { SET_HISTORIA_CLINICA, SET_LISTA_HISTORIA_CLINICA } from "./types";
import { url_servidor } from "Utils/constants";

export function setHistoriaClinica(historiaClinica) {
  return (dispatch) => {
    dispatch({
      type: SET_HISTORIA_CLINICA,
      payload: historiaClinica,
    });
  };
}

export function eliminarHistoriaClinica(id) {
  return (dispatch) => {
    fetch(`${url_servidor}historiaClinica/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_LISTA_HISTORIA_CLINICA,
          payload: data,
        });
      });
  };
}

export function getListaHistoriaClinica() {
  return (dispatch) => {
    fetch(`${url_servidor}historiaClinica`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_HISTORIA_CLINICA,
          payload: data,
        })
      );
  };
}
