import { SET_LISTA_ESTADOS_TURNO } from "actions/types";
const initialState = {
  listaEstadosTurno: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LISTA_ESTADOS_TURNO:
      return {
        ...state,
        listaEstadosTurno: action.payload,
      };

    default:
      return state;
  }
}
