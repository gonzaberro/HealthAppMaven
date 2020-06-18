import { SET_PRESTADORA, SET_LISTA_PRESTADORA } from "./types";
import { url_servidor } from "Utils/constants";

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
    fetch(url_servidor + "prestadora/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
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
