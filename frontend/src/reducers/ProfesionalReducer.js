import { SET_PROFESIONAL, SET_LISTA_PROFESIONAL } from "actions/types";

const initialState = {
  profesional: {},
  listaProfesionales: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PROFESIONAL:
      return {
        ...state,
        profesional: action.payload,
      };
    case SET_LISTA_PROFESIONAL:
      return {
        ...state,
        listaProfesionales: action.payload,
      };

    default:
      return state;
  }
}
