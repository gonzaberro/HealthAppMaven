import {
  SET_HISTORIA_CLINICA,
  SET_LISTA_HISTORIA_CLINICA,
  MODAL_HISTORIA_CLINICA,
} from "./types";
import { url_servidor } from "Utils/constants";

export function setModalHistoriaClinica(open) {
  return (dispatch) => {
    dispatch({
      type: MODAL_HISTORIA_CLINICA,
      payload: open,
    });
  };
}
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

export function getListaHistoriaClinica(dni) {
  return (dispatch) => {
    fetch(`${url_servidor}historiaClinica/dni/${dni}`, {
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
