import { SET_OBRA_SOCIAL, SET_LISTA_OBRA_SOCIAL } from "actions/types";
const initialState = {
  obraSocial: {},
  listaObrasSociales: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_OBRA_SOCIAL:
      return {
        ...state,
        obraSocial: action.payload,
      };
    case SET_LISTA_OBRA_SOCIAL:
      return {
        ...state,
        listaObrasSociales: action.payload,
      };

    default:
      return state;
  }
}
