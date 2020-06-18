import {
  NEW_TURNO,
  FECHA_AGENDA,
  BORRAR_TURNO,
  SELECT_DIA_MES,
} from "../actions/types";

const initialState = {
  turnos: [],
  fecha_agenda: new Date(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_TURNO:
      return {
        ...state,
        turnos: agregarTurnos(state.turnos, action.payload),
      };

    case FECHA_AGENDA:
      return {
        ...state,
        fecha_agenda: action.payload,
      };

    case SELECT_DIA_MES:
      return {
        ...state,
        fecha_agenda: action.payload,
      };

    case BORRAR_TURNO:
      return {
        ...state,
        turnos: borrarTurnos(state.turnos, action.payload),
      };

    default:
      return state;
  }
}

function borrarTurnos(listTurnos, info_turno) {
  const foundIndexHorario = listTurnos.findIndex(
    (horario) => horario.horario === info_turno.horario
  );

  let turnos_aux = listTurnos[foundIndexHorario].turnos;

  turnos_aux.splice(info_turno.index, 1);
  listTurnos[foundIndexHorario].turnos = turnos_aux;

  return [...listTurnos];
}

function agregarTurnos(listTurnos, nuevo_turno) {
  const foundIndexHorario = listTurnos.findIndex(
    (horario) => horario.horario === nuevo_turno.horario
  );

  if (foundIndexHorario === -1) {
    return [
      ...listTurnos,
      { horario: nuevo_turno.horario, turnos: [nuevo_turno.turno] },
    ];
  } else {
    const foundIndexTurno = listTurnos[foundIndexHorario].turnos.findIndex(
      (turno) =>
        turno.paciente === nuevo_turno.turno.paciente &&
        turno.doctor === nuevo_turno.turno.doctor
    );

    if (foundIndexTurno === -1) {
      let turnos_aux = listTurnos[foundIndexHorario].turnos;
      turnos_aux.push(nuevo_turno.turno);
      listTurnos[foundIndexHorario].turnos = turnos_aux;

      return [...listTurnos];
    } else {
      return [...listTurnos];
    }
  }
}
