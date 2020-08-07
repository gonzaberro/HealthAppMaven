import { url_servidor, error_generico } from "Utils/constants";
import { getTurnos } from "../../../actions/AgendaActions";
import { setDefault, setDoctor } from "../../../actions/EditTurnoActions";
import { cleanProgramar } from "actions/ProgramarAgendaActions";
import { ERROR_MESSAGE } from "actions/types";
const sendTurno = (data) => {
  fetch(url_servidor + "turno", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      cdTurno: data.turnoInfo.cdTurno !== 0 ? data.turnoInfo.cdTurno : 0,
      hora: data.turnoInfo.horario,
      paciente: { dni: data.turnoInfo.paciente },
      profesional: { dni: data.turnoInfo.doctor },
      servicio: { cd_servicio: data.turnoInfo.servicio },
      prestadora: JSON.parse(localStorage.getItem("prestadora")),
      tipoServicio: { cdTipoServicio: data.turnoInfo.tipoServicio },
      fecha: new Date(data.fechaCalendario + " " + data.turnoInfo.horario),
      notas: data.turnoInfo.nota,
      estadoTurno: {
        cdEstado: data.turnoInfo.estadoTurno,
        dsEstasdo: "",
        colorHexa: "",
      },
      programarAgenda: data.programarAgenda,
    }),
  })
    .then(function (response) {
      if (response.status === 200) {
        data.dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Se guardó el turno",
            tipo: "success",
          },
        });

        data.dispatch(
          getTurnos(data.fechaCalendario, data.profesional_seleccionado)
        );
        data.dispatch(cleanProgramar());
        data.dispatch(setDefault());
        data.dispatch(setDoctor(data.profesional_seleccionado));
      } else {
        data.dispatch({
          type: ERROR_MESSAGE,
          payload: {
            message: "Error al guardar el turno",
            tipo: "error",
          },
        });
      }
    })
    .catch(() => {
      data.dispatch({
        type: ERROR_MESSAGE,
        payload: {
          message: error_generico,
          tipo: "error",
        },
      });
    });
};

export const grabarTurno = (
  turnoInfo,
  dispatch,
  fechaCalendario,
  profesional_seleccionado,
  programarAgenda,
  token
) => {
  const data = {
    turnoInfo: turnoInfo,
    dispatch: dispatch,
    fechaCalendario: fechaCalendario,
    profesional_seleccionado: profesional_seleccionado,
    programarAgenda: programarAgenda,
    token: token,
  };
  data.programarAgenda.tipo =
    data.turnoInfo.programar === 0 ? 0 : data.programarAgenda.tipo;

  sendTurno(data);
};
