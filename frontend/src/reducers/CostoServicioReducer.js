import { SET_COSTO_SERVICIO, SET_LISTA_COSTO_SERVICIO } from "actions/types";
const initialState = {
  costoServicio: {},
  listaCostoServicios: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COSTO_SERVICIO:
      return {
        ...state,
        costoServicio: action.payload,
      };
    case SET_LISTA_COSTO_SERVICIO:
      return {
        ...state,
        listaCostoServicios: action.payload,
      };

    default:
      return state;
  }
}
