import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import EditAgendaHeader from "./EditAgendaHeader";
import ProgramarAgenda from "./ProgramarAgenda";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import {
  optionsTipoServicios,
  optionsEstadosTurno,
  optionsHorarios,
  optionsProfesional,
  optionsPaciente,
  optionsServicios,
  validarCamposTurno,
  setFechaEsp,
} from "./editAgendaFunctions";

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
  setEstadoTurno,
  setFecha,
} from "../../../actions/EditTurnoActions";
import { setFechaAgenda } from "../../../actions/AgendaActions";
import { useSnackbar } from "notistack";
import { confirmAlert } from "react-confirm-alert"; // Import
import { fechaString } from "Utils/functions";
import { grabarTurno } from "./grabarTurnoLogica";
import { cleanProgramar } from "actions/ProgramarAgendaActions";
import { setDefault } from "../../../actions/EditTurnoActions";
import { CLEAN_GLOBAL } from "actions/types";
import { setProfesional } from "actions/ProfesionalActions";

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
  const listaEstadosTurno = useSelector(
    (state) => state.estadosTurno.listaEstadosTurno
  );
  const listaTipoServicios = useSelector(
    (state) => state.tipoServicio.listaTipoServicios
  );
  const profesional_seleccionado = useSelector(
    (state) => state.agenda_reducer.profesional_seleccionado
  );

  /*useEffect(() => {
    dispatch(cleanProgramar());
  }, [dispatch, turno_info, fechaCalendario]);*/

  useEffect(() => {
    dispatch(setFecha(fechaCalendario));
  }, [dispatch, fechaCalendario]);

  useEffect(() => {
    dispatch(setProfesional(profesional_seleccionado));
  }, [dispatch, profesional_seleccionado]);

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
    if (fechaString(fechaCalendario) >= fechaString(new Date())) {
      if (validarCamposTurno(turno_info)) {
        grabarTurno(
          turno_info,
          dispatch,
          fechaString(fechaCalendario),
          profesional_seleccionado,
          programarAgenda
        );
      } else {
        enqueueSnackbar("No puede dejar campos vacíos.", {
          variant: "warning",
        });
      }
    } else {
      enqueueSnackbar("Debe seleccionar una fecha mayor a hoy.", {
        variant: "warning",
      });
    }
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
    });
  };

  return (
    <>
      <EditAgendaHeader />
      <Select
        options={optionsProfesional(listaProfesionales)}
        isSearchable={true}
        placeholder={<div>Profesional</div>}
        styles={colourStyles}
        onChange={(value) => setDoctorSeleccinado(value.value)}
        value={optionsProfesional(listaProfesionales).filter(
          (option) => option.value === profesional_seleccionado
        )}
      />
      <Select
        options={optionsPaciente(listaPacientes)}
        isSearchable={true}
        placeholder={<div>Paciente</div>}
        styles={colourStyles}
        isDisabled={turno_info.cdTurno !== 0 ? true : false}
        onChange={(value) => dispatch(setPaciente(value.value))}
        value={optionsPaciente(listaPacientes).filter(
          (option) => option.value === turno_info.paciente
        )}
      />
      <Select
        options={optionsServicios(listaServicios)}
        isSearchable={true}
        placeholder={<div>Servicio</div>}
        styles={colourStyles}
        onChange={(value) => dispatch(setServicio(value.value))}
        value={optionsServicios(listaServicios).filter(
          (option) => option.value === turno_info.servicio
        )}
      />

      <Select
        options={optionsTipoServicios(listaTipoServicios)}
        isSearchable={true}
        placeholder={<div>Tipo de Servicio</div>}
        styles={colourStyles}
        onChange={(value) => dispatch(setTipoServicio(value.value))}
        value={optionsTipoServicios(listaTipoServicios).filter(
          (option) => option.value === turno_info.tipoServicio
        )}
      />
      <Select
        options={optionsEstadosTurno(listaEstadosTurno)}
        isSearchable={true}
        placeholder={<div>Estado del Turno</div>}
        isDisabled={turno_info.cdTurno === 0}
        styles={colourStyles}
        onChange={(value) => dispatch(setEstadoTurno(value.value))}
        value={optionsEstadosTurno(listaEstadosTurno).filter(
          (option) => option.value === turno_info.estadoTurno
        )}
      />
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
          <Select
            options={optionsHorarios(horarios)}
            isSearchable={true}
            placeholder={<div>Horario</div>}
            styles={colourStyles}
            onChange={(value) => dispatch(setHorario(value.value))}
            value={optionsHorarios(horarios).filter(
              (option) => option.value === turno_info.horario
            )}
          />
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
            disabled={
              turno_info.cdTurno > 0 &&
              fechaString(fechaCalendario) >= fechaString(new Date())
                ? false
                : true
            }
            onClick={() => eliminarTurno(turno_info)}
          >
            Eliminar
          </Button>
        </Grid>
        <Grid item md={8} xs={12} style={{ paddingLeft: 5 }}>
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

const colourStyles = {
  control: (base) => ({
    ...base,
    height: 56,
    minHeight: 35,
    margin: 10,
  }),
};
