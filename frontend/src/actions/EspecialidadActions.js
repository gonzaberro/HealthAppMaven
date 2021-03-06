import {
  SET_ESPECIALIDAD,
  SET_LISTA_ESPECIALIDAD,
  ERROR_MESSAGE,
} from "./types";
import { url_servidor, error_generico } from "Utils/constants";
export function setEspecialidad(especialidad) {
  //Set de la obraSocial que quiero editar
  return (dispatch) => {
    dispatch({
      type: SET_ESPECIALIDAD,
      payload: especialidad,
    });
  };
}

export function especialidadesPaciente(dni) {
  return (dispatch) => {
    fetch(url_servidor + "especialidad/paciente/" + dni, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_LISTA_ESPECIALIDAD,
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

export function eliminarEspecialidad(cd_especialidad, token) {
  return (dispatch) => {
    fetch(url_servidor + "especialidad/" + cd_especialidad, {
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
              : "Error " +
                response.status +
                " al intentar eliminar la especialidad"
          );
        }
        return response.json();
      })

      .then((data) => {
        dispatch({
          type: SET_LISTA_ESPECIALIDAD,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: { message: "Se eliminó la especialidad", tipo: "success" },
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
export function getListaEspecialidad() {
  return (dispatch) => {
    fetch(url_servidor + "especialidad", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_ESPECIALIDAD,
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
