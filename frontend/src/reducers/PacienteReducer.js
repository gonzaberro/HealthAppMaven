import { SET_PACIENTE, SET_LISTA_PACIENTE } from "actions/types";

const initialState = {
  paciente: {},
  listaPacientes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PACIENTE:
      return {
        ...state,
        paciente: action.payload,
      };
    case SET_LISTA_PACIENTE:
      return {
        ...state,
        listaPacientes: action.payload,
      };

    default:
      return state;
  }
}
