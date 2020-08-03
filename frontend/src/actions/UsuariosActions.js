import { SET_USUARIO, ERROR_MESSAGE, SET_LISTA_USUARIOS } from "./types";
import { url_servidor, error_generico } from "Utils/constants";

export function setUsuario(usuario) {
  return (dispatch) => {
    dispatch({
      type: SET_USUARIO,
      payload: usuario,
    });
  };
}

export function eliminarUsuario(cd_usuario) {
  return (dispatch) => {
    fetch(`${url_servidor}usuario/${cd_usuario}`, {
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
              : "Error " + response.status + " al intentar eliminar el usuario"
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_LISTA_USUARIOS,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se eliminó el usuario",
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

export function getListaUsuarios() {
  return (dispatch) => {
    fetch(`${url_servidor}usuario`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_USUARIOS,
          payload: data,
        })
      )
      .catch(() => {
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: error_generico,
            tipo: "error",
          },
        });
      });
  };
}
