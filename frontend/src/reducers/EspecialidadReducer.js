import { SET_ESPECIALIDAD, SET_LISTA_ESPECIALIDAD } from "actions/types";
const initialState = {
  especialidad: { cd_especialidad: 0, nombre: "" },
  listaEspecialidades: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ESPECIALIDAD:
      return {
        ...state,
        especialidad: action.payload,
      };
    case SET_LISTA_ESPECIALIDAD:
      return {
        ...state,
        listaEspecialidades: action.payload,
      };

    default:
      return state;
  }
}
