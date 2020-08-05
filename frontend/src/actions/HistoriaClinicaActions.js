import {
  SET_HISTORIA_CLINICA,
  SET_LISTA_HISTORIA_CLINICA,
  ERROR_MESSAGE,
} from "./types";
import { url_servidor, error_generico } from "Utils/constants";

export function setHistoriaClinica(historiaClinica) {
  return (dispatch) => {
    dispatch({
      type: SET_HISTORIA_CLINICA,
      payload: historiaClinica,
    });
  };
}
export function eliminarHistoriaClinica(id, callBack, especialidadPaciente) {
  return (dispatch) => {
    fetch(`${url_servidor}historiaClinica/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          callBack();
          especialidadPaciente();
          dispatch({
            type: ERROR_MESSAGE,
            payload: {
              message: "Se elimnó la historia clinica",
              tipo: "success",
            },
          });
        }
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

export function getListaHistoriaClinica(dni, especialidad) {
  return (dispatch) => {
    fetch(
      `${url_servidor}historiaClinica/dni/${dni}/especialidad/${especialidad}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_HISTORIA_CLINICA,
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

export function cleanHistoriaClinica() {
  return (dispatch) => {
    dispatch({
      type: SET_LISTA_HISTORIA_CLINICA,
      payload: [],
    });
  };
}
