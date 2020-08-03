import { SET_LISTA_ESTADOS_TURNO, ERROR_MESSAGE } from "./types";
import { url_servidor, error_generico } from "Utils/constants";

export function getEstadosTurno() {
  return (dispatch) => {
    fetch(url_servidor + "estadosTurno", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_ESTADOS_TURNO,
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
