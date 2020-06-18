import { SET_ESPECIALIDAD, SET_LISTA_ESPECIALIDAD } from "./types";
import { url_servidor } from "Utils/constants";
export function setEspecialidad(especialidad) {
  //Set de la obraSocial que quiero editar
  return (dispatch) => {
    dispatch({
      type: SET_ESPECIALIDAD,
      payload: especialidad,
    });
  };
}

export function eliminarEspecialidad(cd_especialidad) {
  return (dispatch) => {
    fetch(url_servidor + "especialidad/" + cd_especialidad, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_ESPECIALIDAD,
          payload: data,
        })
      );
  };
}
export function getListaEspecialidad() {
  return (dispatch) => {
    fetch(url_servidor + "especialidad", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_ESPECIALIDAD,
          payload: data,
        })
      );
  };
}
