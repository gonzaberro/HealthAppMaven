import { SET_PRESTADORA, SET_LISTA_PRESTADORA } from "actions/types";
const initialState = {
  prestadora: {
    cd_prestadora: 0,
    nombre: "",
    direccion: "",
    telefono: "",
    logo: "",
    intervalo: 0,
    horaDesde: "",
    horaHasta: "",
  },
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
