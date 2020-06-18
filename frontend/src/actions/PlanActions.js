import { SET_PLAN, SET_LISTA_PLANES } from "./types";
import { url_servidor } from "Utils/constants";
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
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SET_LISTA_PLANES,
          payload: data,
        })
      );
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
