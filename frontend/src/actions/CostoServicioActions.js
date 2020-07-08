import {
  SET_COSTO_SERVICIO,
  SET_LISTA_COSTO_SERVICIO,
  ERROR_MESSAGE,
} from "./types";
import { url_servidor, error_generico } from "Utils/constants";
export function setCostoServicio(costoServicio) {
  //Set de la Plan que quiero editar
  return (dispatch) => {
    dispatch({
      type: SET_COSTO_SERVICIO,
      payload: costoServicio,
    });
  };
}

export function eliminarCostoServicio(cd_servicio, cd_plan, cd_tipo_servicio) {
  return (dispatch) => {
    fetch(
      url_servidor +
        "costoServicio/" +
        cd_servicio +
        "/" +
        cd_plan +
        "/" +
        cd_tipo_servicio,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            response.status !== 500
              ? error_generico
              : "Error " +
                response.status +
                " al intentar eliminar el costo del servicio"
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_LISTA_COSTO_SERVICIO,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se eliminó el costo del servicio",
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
export function getListaCostoServicios() {
  return (dispatch) => {
    fetch(url_servidor + "costoServicio", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_COSTO_SERVICIO,
          payload: data,
        })
      );
  };
}
