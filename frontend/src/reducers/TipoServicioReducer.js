import { SET_TIPO_SERVICIO, SET_LISTA_TIPO_SERVICIO } from "actions/types";
const initialState = {
  tipoServicio: {},
  listaTipoServicios: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TIPO_SERVICIO:
      return {
        ...state,
        tipoServicio: action.payload,
      };
    case SET_LISTA_TIPO_SERVICIO:
      return {
        ...state,
        listaTipoServicios: action.payload,
      };

    default:
      return state;
  }
}
