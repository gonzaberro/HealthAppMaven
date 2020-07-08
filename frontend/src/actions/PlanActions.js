import { SET_PLAN, SET_LISTA_PLANES, ERROR_MESSAGE } from "./types";
import { url_servidor, error_generico } from "Utils/constants";
export function setPlan(Plan) {
  //Set de la Plan que quiero editar
  return (dispatch) => {
    dispatch({
      type: SET_PLAN,
      payload: Plan,
    });
  };
}

export function eliminarPlan(cd_plan) {
  return (dispatch) => {
    fetch(url_servidor + "plan/" + cd_plan, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            response.status !== 500
              ? error_generico
              : "Error " + response.status + " al intentar eliminar el plan"
          );
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: SET_LISTA_PLANES,
          payload: data,
        });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se eliminó el plan",
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
export function getListaPlanes() {
  return (dispatch) => {
    fetch(url_servidor + "plan", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_PLANES,
          payload: data,
        })
      );
  };
}
