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
import { getTurnos, borrarTurno } from "../../../actions/AgendaActions";
import {
  setDoctor,
  setHorario,
  setPaciente,
  setProgramar,
  setServicio,
  setNota,
  setTipoServicio,
} from "../../../actions/EditTurnoActions";
import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function EditAgendaItem() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const turno_info = useSelector((state) => state.editTurnoReducer);
  const horarios = useSelector((state) => state.agenda_reducer.horarios);
  const { enqueueSnackbar } = useSnackbar();
  const fechaCalendario = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );
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
  const fechaString = () => {
    const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(
      fechaCalendario
    );
    const mo = new Intl.DateTimeFormat("es", { month: "2-digit" }).format(
      fechaCalendario
    );
    const da = new Intl.DateTimeFormat("es", { day: "2-digit" }).format(
      fechaCalendario
    );
    return ye + "-" + mo + "-" + da;
  };

  const [fechaTurno, setFechaTurno] = useState(fechaString());

  useEffect(() => {
    if (turno_info.fecha !== "") setFechaTurno(turno_info.fecha);
  }, [turno_info]);

  const changeProgramar = () => {
    dispatch(setProgramar(turno_info.programar === 0 ? 1 : 0));
  };

  const guardarTurno = () => {
    const {
      cdTurno,
      paciente,
      doctor,
      horario,
      nota,
      servicio,
      tipoServicio,
    } = turno_info;

    if (
      paciente !== "" &&
      doctor !== "" &&
      horario !== "" &&
      servicio !== "" &&
      tipoServicio !== ""
    ) {
      fetch(url_servidor + "turno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cdTurno: cdTurno !== 0 ? cdTurno : 0,
          hora: horario,
          paciente: { dni: paciente },
          profesional: { dni: doctor },
          servicio: { cd_servicio: servicio },
          tipoServicio: { cdTipoServicio: tipoServicio },
          fecha: fechaTurno,
          notas: nota,
        }),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó el turno", {
            variant: "success",
          });
          dispatch(
            getTurnos(fechaString(fechaCalendario), profesional_seleccionado)
          );
        } else {
          enqueueSnackbar("Error al guardar el turno", {
            variant: "error",
          });
        }
      });
    }
  };

  const eliminarTurno = (turno) => {
    if (turno.cdTurno !== 0) {
      confirmAlert({
        title: "¿Eliminar turno de paciente DNI: " + turno.paciente + "?",
        message: "",
        buttons: [
          {
            label: "Confirmar",
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
      borrarTurno(turno.cdTurno, () =>
        dispatch(
          getTurnos(fechaString(fechaCalendario), profesional_seleccionado)
        )
      )
    );
  };

  return (
    <>
      <EditAgendaHeader />
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Doctor</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(event) => dispatch(setDoctor(event.target.value))}
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
              value={fechaTurno}
              variant="outlined"
              onChange={(event) => setFechaTurno(event.target.value)}
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
              label="Institución"
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
