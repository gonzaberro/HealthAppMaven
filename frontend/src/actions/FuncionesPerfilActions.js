import {
  SET_FUNCIONES_ASIGNADAS,
  SET_FUNCIONES_DISPONIBLES,
  ERROR_MESSAGE,
} from "./types";
import { url_servidor, error_generico } from "Utils/constants";

export function getFuncionesDisponibles(perfil) {
  return (dispatch) => {
    fetch(url_servidor + "funcionDisponiblePerfil/" + perfil, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_FUNCIONES_DISPONIBLES,
          payload: data,
        });
      })
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

export function getFuncionesAsignadas(perfil) {
  return (dispatch) => {
    fetch(url_servidor + "funcionPerfil/" + perfil, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_FUNCIONES_ASIGNADAS,
          payload: data,
        });
      })
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
