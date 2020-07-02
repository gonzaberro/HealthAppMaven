import {
  SET_TIPO,
  SET_REPETIR,
  SET_CANTIDAD,
  SET_ARRAY_DIAS,
  SET_DIA,
  CLEAN_PROGRAMAR,
} from "../actions/types";

const initialState = {
  tipo: 0,
  repetir: 1,
  cantidad: 1,
  arrayDias: [], //Para la semanal
  numeroDia: 1, //Para el mensual
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TIPO:
      return {
        ...state,
        tipo: action.payload,
      };
    case SET_REPETIR:
      return {
        ...state,
        repetir: action.payload,
      };
    case CLEAN_PROGRAMAR:
      return {
        ...state,
        tipo: 0,
        repetir: 1,
        cantidad: 1,
        arrayDias: [],
        numeroDia: 1,
      };
    case SET_CANTIDAD:
      return {
        ...state,
        cantidad: action.payload,
      };
    case SET_ARRAY_DIAS:
      return {
        ...state,
        arrayDias: action.payload,
      };
    case SET_DIA:
      return {
        ...state,
        numeroDia: action.payload,
      };

    default:
      return state;
  }
}
