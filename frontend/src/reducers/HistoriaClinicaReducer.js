import {
  SET_HISTORIA_CLINICA,
  SET_LISTA_HISTORIA_CLINICA,
} from "actions/types";

const initialState = {
  historiaClinica: {},
  listaHistoriaClinica: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_HISTORIA_CLINICA:
      return {
        ...state,
        historiaClinica: action.payload,
      };
    case SET_LISTA_HISTORIA_CLINICA:
      return {
        ...state,
        listaHistoriaClinica: action.payload,
      };

    default:
      return state;
  }
}
