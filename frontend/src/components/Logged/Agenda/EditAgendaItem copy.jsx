import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import EditAgendaHeader from "./EditAgendaHeader";
import ProgramarAgenda from "./ProgramarAgenda";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import {
  getTurnos,
  borrarTurno,
  selectProfesionalAgenda,
} from "../../../actions/AgendaActions";
import {
  setDoctor,
  setHorario,
  setPaciente,
  setProgramar,
  setServicio,
  setNota,
  setTipoServicio,
} from "../../../actions/EditTurnoActions";
import { setFechaAgenda } from "../../../actions/AgendaActions";
import { useSnackbar } from "notistack";
import { confirmAlert } from "react-confirm-alert"; // Import
import { fechaString, formatDateString } from "Utils/functions";
import { grabarTurno } from "./grabarTurnoLogica";
import { cleanProgramar } from "actions/ProgramarAgendaActions";
import { setDefault } from "../../../actions/EditTurnoActions";
import { CLEAN_GLOBAL } from "actions/types";

export default function EditAgendaItem() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const turno_info = useSelector((state) => state.editTurnoReducer);
  const horarios = useSelector((state) => state.agenda_reducer.horarios);
  const { enqueueSnackbar } = useSnackbar();
  const fechaCalendario = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );
  const programarAgenda = useSelector((state) => state.programarAgenda);
  const listaPacientes = useSelector((state) => state.paciente.listaPacientes);
  const listaProfesionales = useSelector(
    (state) => state.profesional.listaProfesionales
  );
  const listaServicios = useSelector((state) => state.servicio.listaServicios);
  const listaTipoServicios = useSelector(
    (state) => state.tipoServicio.listaTipoServicios
  );
  const profesional_seleccionado = useSelector(
    (state) => state.agenda_reducer.profesional_seleccionado
  );

  useEffect(() => {
    dispatch(cleanProgramar());
  }, [dispatch, turno_info, fechaCalendario]);

  const changeProgramar = () => {
    dispatch(setProgramar(turno_info.programar === 0 ? 1 : 0));
  };
  const seleccionarFechaTurno = (fecha) => {
    if (fecha >= fechaString(new Date())) {
      dispatch(setFechaAgenda(new Date(fecha + " " + turno_info.horario)));
    } else {
      enqueueSnackbar("No puede seleccionar una fecha anterior al día de hoy", {
        variant: "warning",
      });
    }
  };
  const guardarTurno = () => {
    console.log(fechaString(new Date()));
    if (fechaString(fechaCalendario) >= fechaString(new Date())) {
      if (
        turno_info.paciente !== "" &&
        turno_info.doctor !== "" &&
        turno_info.horario !== "" &&
        turno_info.servicio !== "" &&
        turno_info.tipoServicio !== ""
      ) {
        grabarTurno(
          turno_info,
          enqueueSnackbar,
          dispatch,
          fechaString(fechaCalendario),
          profesional_seleccionado,
          programarAgenda
        );
      }
    } else {
      enqueueSnackbar("No puede seleccionar una fecha anterior al día de hoy", {
        variant: "warning",
      });
    }
  };
  const setFechaEsp = (fecha, hora) => {
    fecha = fecha + " " + hora;
    return new Date(fecha).toLocaleString("es-ES", {
      timeZone: "America/Argentina/Buenos_Aires",
    });
  };
  const eliminarTurno = (turno) => {
    let pacienteTurno = listaPacientes.filter(
      (paciente) => paciente.dni === turno.paciente
    )[0];
    let profesionalTurno = listaProfesionales.filter(
      (profesional) => profesional.dni === turno.doctor
    )[0];

    if (turno.cdTurno !== 0) {
      confirmAlert({
        title: "Turno: " + pacienteTurno.nombre + " " + pacienteTurno.apellido,
        message:
          "Día " +
          setFechaEsp(turno.fecha, turno.horario) +
          " Profesional: " +
          profesionalTurno.nombre +
          " " +
          profesionalTurno.apellido,

        buttons: [
          {
            label: "Eliminar",
            onClick: () => confirmDeleteTurno(turno),
          },
          {
            label: "Cancelar",
          },
        ],
      });
    }
  };

  const confirmDeleteTurno = (turno) => {
    dispatch(
      borrarTurno(
        turno.cdTurno,
        () => dispatch(cleanProgramar()),
        () => dispatch(setDefault()),
        () =>
          dispatch(
            getTurnos(fechaString(fechaCalendario), profesional_seleccionado)
          )
      )
    );
  };
  const setDoctorSeleccinado = (doctor) => {
    dispatch(setDoctor(doctor));
    dispatch(selectProfesionalAgenda(doctor));

    dispatch({
      type: CLEAN_GLOBAL,
      payload: false,
    }); //Voy a ver la visual del calendario por DIA*/
  };
  return (
    <>
      <EditAgendaHeader />
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Doctor</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(event) => setDoctorSeleccinado(event.target.value)}
          label="Doctor"
          value={turno_info.doctor}
          fullWidth
        >
          {listaProfesionales.map((profesional) => {
            return (
              <MenuItem value={profesional.dni}>
                {profesional.nombre} {profesional.apellido} (
                {profesional.especialidad.nombre})
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Paciente</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(event) => dispatch(setPaciente(event.target.value))}
          label="Paciente"
          disabled={turno_info.cdTurno !== 0 ? true : false}
          value={turno_info.paciente}
          fullWidth
        >
          {listaPacientes.map((paciente) => {
            return (
              <MenuItem value={paciente.dni}>
                {paciente.nombre} {paciente.apellido} - {paciente.dni}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Servicio</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Servicio"
          onChange={(event) => dispatch(setServicio(event.target.value))}
          value={turno_info.servicio}
          fullWidth
        >
          {listaServicios.map((servicio) => {
            return (
              <MenuItem value={servicio.cd_servicio}>
                {servicio.cd_servicio} - {servicio.nombre}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Tipo Servicio
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Tipo Servicio"
          onChange={(event) => dispatch(setTipoServicio(event.target.value))}
          value={turno_info.tipoServicio}
          fullWidth
        >
          {listaTipoServicios.map((tipoServicio) => {
            return (
              <MenuItem value={tipoServicio.cdTipoServicio}>
                {tipoServicio.nombre}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Grid container>
        <Grid item md={6} xs={12}>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Fecha"
              type="date"
              value={fechaString(fechaCalendario)}
              variant="outlined"
              onChange={(event) => seleccionarFechaTurno(event.target.value)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Horario
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Horario"
              value={turno_info.horario}
              onChange={(event) => dispatch(setHorario(event.target.value))}
              fullWidth
            >
              {horarios.map((horario) => {
                return (
                  <MenuItem key={horario} value={horario}>
                    {horario}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <form className={classes.container} noValidate>
        <InputLabel id="demo-simple-select-outlined-label">Notas</InputLabel>
        <TextareaAutosize
          rowsMax={4}
          className={classes.textArea}
          value={turno_info.nota}
          onChange={(event) => dispatch(setNota(event.target.value))}
          aria-label="maximum height"
        />
      </form>
      <FormControlLabel
        className={classes.checkBoxContainer}
        control={
          <Checkbox
            checked={turno_info.programar === 1 ? true : false}
            onChange={changeProgramar}
            name="checkedB"
            color="primary"
          />
        }
        label="Programar"
      />
      <ProgramarAgenda programar={turno_info.programar} />
      <Grid container style={{ marginTop: 20 }}>
        <Grid item md={4} xs={12}>
          <Button
            variant="contained"
            color="default"
            fullWidth
            disabled={turno_info.cdTurno > 0 ? false : true}
            onClick={() => eliminarTurno(turno_info)}
          >
            Eliminar
          </Button>
        </Grid>
        <Grid item md={8} xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={
              fechaString(fechaCalendario) < fechaString(new Date())
                ? true
                : false
            }
            onClick={guardarTurno}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 10,
  },
  container: {
    margin: 10,
    marginRight: 0,
    paddingRight: 0,
    width: "100%",
  },
  textField: {
    width: "100%",
  },
  spanRepetir: {
    paddingTop: 20,
  },
  checkBoxContainer: {
    margin: 10,
    color: "#0000008a",
    borderTop: "1px solid #ccc",
    width: "100%",
  },
  textArea: {
    width: "100%",
    maxWidth: "100%",
    minWidth: "100%",
    minHeight: 100,
    maxHeight: 100,
    borderColor: "#c4c4c4",
    borderRadius: 5,
    marginTop: 5,
  },

  gridContainer: { border: "1px solid #ccc", padding: 30, paddingTop: 0 },
}));
