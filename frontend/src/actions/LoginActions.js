import { SET_LOGIN } from "../actions/types";

export function setLogin(login) {
  //Cambio el valor del login para saber si estoy o no logueado
  return (dispatch) => {
    dispatch({
      type: SET_LOGIN,
      payload: login,
    });
  };
}
