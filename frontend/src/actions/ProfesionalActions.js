import { SET_PROFESIONAL, SET_LISTA_PROFESIONAL } from "./types";
import { url_servidor } from "Utils/constants";

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
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_LISTA_PROFESIONAL,
          payload: data,
        });
      });
  };
}

export function getListaProfesionales() {
  return (dispatch) => {
    fetch(`${url_servidor}profesional`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
