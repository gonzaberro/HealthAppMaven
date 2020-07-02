import { url_servidor } from "Utils/constants";
import { getTurnos } from "../../../actions/AgendaActions";
import { setDefault } from "../../../actions/EditTurnoActions";
import { cleanProgramar } from "actions/ProgramarAgendaActions";

const sendTurno = (data) => {
  fetch(url_servidor + "turno", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cdTurno: data.turnoInfo.cdTurno !== 0 ? data.turnoInfo.cdTurno : 0,
      hora: data.turnoInfo.horario,
      paciente: { dni: data.turnoInfo.paciente },
      profesional: { dni: data.turnoInfo.doctor },
      servicio: { cd_servicio: data.turnoInfo.servicio },
      tipoServicio: { cdTipoServicio: data.turnoInfo.tipoServicio },
      fecha: new Date(data.fechaCalendario + " " + data.turnoInfo.horario),
      notas: data.turnoInfo.nota,
      programarAgenda: data.programarAgenda,
    }),
  }).then(function (response) {
    if (response.status === 200) {
      data.enqueueSnackbar("Se guardó el turno", {
        variant: "success",
      });

      data.dispatch(
        getTurnos(data.fechaCalendario, data.profesional_seleccionado)
      );
      data.dispatch(cleanProgramar());
      data.dispatch(setDefault());
    } else {
      data.enqueueSnackbar("Error al guardar el turno", {
        variant: "error",
      });
    }
  });
};

export const grabarTurno = (
  turnoInfo,

  enqueueSnackbar,
  dispatch,
  fechaCalendario,
  profesional_seleccionado,
  programarAgenda
) => {
  const data = {
    turnoInfo: turnoInfo,
    enqueueSnackbar: enqueueSnackbar,
    dispatch: dispatch,
    fechaCalendario: fechaCalendario,
    profesional_seleccionado: profesional_seleccionado,
    programarAgenda: programarAgenda,
  };

  data.programarAgenda.tipo =
    data.turnoInfo.programar === 0 ? 0 : data.programarAgenda.tipo;

  sendTurno(data);
};
