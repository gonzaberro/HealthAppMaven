import { SET_USUARIO, SET_LISTA_USUARIOS } from "actions/types";

const initialState = {
  usuario: {},
  listaUsuarios: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USUARIO:
      return {
        ...state,
        usuario: action.payload,
      };
    case SET_LISTA_USUARIOS:
      return {
        ...state,
        listaUsuarios: action.payload,
      };

    default:
      return state;
  }
}
