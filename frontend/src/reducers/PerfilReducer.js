import { SET_PERFIL, SET_LISTA_PERFIL } from "actions/types";
const initialState = {
  perfil: {},
  listaPerfiles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PERFIL:
      return {
        ...state,
        perfil: action.payload,
      };
    case SET_LISTA_PERFIL:
      return {
        ...state,
        listaPerfiles: action.payload,
      };

    default:
      return state;
  }
}
