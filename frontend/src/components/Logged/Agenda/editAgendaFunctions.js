export const optionsProfesional = (listaProfesionales) => {
  const options = [];

  listaProfesionales.map((profesional) => {
    return options.push({
      value: profesional.dni,
      label:
        profesional.nombre +
        " " +
        profesional.apellido +
        " (" +
        profesional.especialidad.nombre +
        ")",
    });
  });
  return options;
};
export const optionsPaciente = (listaPacientes) => {
  const options = [];

  listaPacientes.map((paciente) => {
    return options.push({
      value: paciente.dni,
      label: paciente.dni + " " + paciente.nombre + " " + paciente.apellido,
    });
  });
  return options;
};
export const optionsServicios = (listaServicios) => {
  const options = [];

  listaServicios.map((servicio) => {
    return options.push({
      value: servicio.cd_servicio,
      label: servicio.cd_servicio + " - " + servicio.nombre,
    });
  });
  return options;
};
export const optionsTipoServicios = (listaTipoServicios) => {
  const options = [];

  listaTipoServicios.map((tipoServicio) => {
    return options.push({
      value: tipoServicio.cdTipoServicio,
      label: tipoServicio.nombre,
    });
  });
  return options;
};
export const optionsEstadosTurno = (listaEstadosTurno) => {
  const options = [];

  listaEstadosTurno.map((estadoTurno) => {
    return options.push({
      value: estadoTurno.cdEstado,
      label: estadoTurno.dsEstado,
    });
  });
  return options;
};
export const optionsHorarios = (horarios) => {
  const options = [];

  horarios.map((horarios) => {
    return options.push({
      value: horarios,
      label: horarios,
    });
  });
  return options;
};
export const validarCamposTurno = (turno_info) => {
  console.log(turno_info);
  if (
    turno_info.paciente !== undefined &&
    turno_info.paciente !== "" &&
    turno_info.doctor !== undefined &&
    turno_info.doctor !== "" &&
    turno_info.horario !== undefined &&
    turno_info.horario !== "" &&
    turno_info.servicio !== undefined &&
    turno_info.servicio !== "" &&
    turno_info.tipoServicio !== undefined &&
    turno_info.tipoServicio !== ""
  ) {
    return true;
  } else {
    return false;
  }
};
export const setFechaEsp = (fecha, hora) => {
  fecha = fecha + " " + hora;
  return new Date(fecha).toLocaleString("es-ES", {
    timeZone: "America/Argentina/Buenos_Aires",
  });
};
