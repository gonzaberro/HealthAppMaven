import { SET_SERVICIO, SET_LISTA_SERVICIOS } from "actions/types";
const initialState = {
  servicio: {},
  listaServicios: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SERVICIO:
      return {
        ...state,
        servicio: action.payload,
      };
    case SET_LISTA_SERVICIOS:
      return {
        ...state,
        listaServicios: action.payload,
      };

    default:
      return state;
  }
}
