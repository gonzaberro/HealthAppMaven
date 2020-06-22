import { SET_COSTO_SERVICIO, SET_LISTA_COSTO_SERVICIO } from "./types";
import { url_servidor } from "Utils/constants";
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
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_COSTO_SERVICIO,
          payload: data,
        })
      );
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
