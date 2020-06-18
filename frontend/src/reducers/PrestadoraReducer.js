import { SET_PRESTADORA, SET_LISTA_PRESTADORA } from "actions/types";
const initialState = {
  prestadora: {},
  listaPrestadoras: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRESTADORA:
      return {
        ...state,
        prestadora: action.payload,
      };

    case SET_LISTA_PRESTADORA:
      return {
        ...state,
        listaPrestadoras: action.payload,
      };

    default:
      return state;
  }
}
