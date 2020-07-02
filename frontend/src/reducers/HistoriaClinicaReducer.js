import {
  SET_HISTORIA_CLINICA,
  SET_LISTA_HISTORIA_CLINICA,
  MODAL_HISTORIA_CLINICA,
} from "actions/types";

const initialState = {
  historiaClinica: {},
  listaHistoriaClinica: [],
  open_modal: false,
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
    case MODAL_HISTORIA_CLINICA:
      return {
        ...state,
        open_modal: action.payload,
      };

    default:
      return state;
  }
}
