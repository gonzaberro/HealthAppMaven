import { SET_OBRA_SOCIAL, SET_LISTA_OBRA_SOCIAL } from "../actions/types";

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
    fetch("http://localhost:8080/obraSocial/" + cd_os, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
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
export function getListaObrasSocial() {
  return (dispatch) => {
    fetch("http://localhost:8080/obraSocial", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
