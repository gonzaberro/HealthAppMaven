import { VISTAMENSUALSEMANAL } from "../actions/types";

export const make_data = function () {
  let turnos_total = { mes: 6, dias: [] };

  for (let i = 1; i <= 30; i++) {
    for (let j = 1; j <= 30; j++) {
      turnos_total.dias.push({
        dia: i,
        paciente: "Gonzalo Martin Berro " + j,
        horario: "0" + j + ":00",
      });
    }
  }
  return turnos_total;
};

const initialState = {
  turnos: make_data(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VISTAMENSUALSEMANAL:
      return {
        ...state,
        turnos: action.payload,
      };

    default:
      return state;
  }
}
