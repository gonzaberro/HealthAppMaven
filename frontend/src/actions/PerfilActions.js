import { SET_PERFIL, SET_LISTA_PERFIL, ERROR_MESSAGE } from "./types";
import { url_servidor, error_generico } from "Utils/constants";

export function setPerfil(especialidad) {
  //Set de la obraSocial que quiero editar
  return (dispatch) => {
    dispatch({
      type: SET_PERFIL,
      payload: especialidad,
    });
  };
}

export function eliminarPerfil(cd_especialidad, token) {
  return (dispatch) => {
    fetch(url_servidor + "perfil/" + cd_especialidad, {
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
              : "Error " + response.status + " al intentar eliminar el perfil"
          );
        }
        return response.json();
      })

      .then((data) => {
        dispatch({
          type: SET_LISTA_PERFIL,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: { message: "Se eliminó el perfil", tipo: "success" },
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
export function getListaPerfil() {
  return (dispatch) => {
    fetch(url_servidor + "perfil", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_PERFIL,
          payload: data,
        })
      );
  };
}
