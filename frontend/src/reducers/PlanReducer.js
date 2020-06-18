import { SET_PLAN, SET_LISTA_PLANES } from "actions/types";
const initialState = {
  plan: { cd_plan: 0, nombre: "", obraSocial: { cd_os: 0, nombre: "" } },
  listaPlanes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAN:
      return {
        ...state,
        plan: action.payload,
      };
    case SET_LISTA_PLANES:
      return {
        ...state,
        listaPlanes: action.payload,
      };

    default:
      return state;
  }
}
