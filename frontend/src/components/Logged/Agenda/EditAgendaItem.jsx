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
import { horarios } from "./itemsAgendaData";
import { useSelector, useDispatch } from "react-redux";
import { addTurno, borrarTurno } from "../../../actions/AgendaActions";
import {
  setDoctor,
  setHorario,
  setPaciente,
  setProgramar,
  setServicio,
  setNota,
} from "../../../actions/EditTurnoActions";

export default function EditAgendaItem() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const turno_info = useSelector((state) => state.editTurnoReducer); //Para saber si estoy o no logueado en el sistema
  const fechaCalendario = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
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
  const crearTurno = () => {
    if (
      turno_info.paciente !== "" &&
      turno_info.doctor !== "" &&
      turno_info.horario !== ""
    ) {
      let turno = {
        horario: turno_info.horario,
        turno: {
          paciente: turno_info.paciente,
          doctor: turno_info.doctor,
          servicio: turno_info.servicio,
          fecha: fechaTurno,
          programar: turno_info.programar,
          nota: turno_info.nota,
        },
      };
      dispatch(addTurno(turno));
    }
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
          <MenuItem value={"Gines Gonzales"}>Gines Gonzales</MenuItem>
          <MenuItem value={"Rene Favaloro"}>Rene Favaloro</MenuItem>
          <MenuItem value={"Conrad Hawkings"}>Conrad Hawkings</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Paciente</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(event) => dispatch(setPaciente(event.target.value))}
          label="Paciente"
          value={turno_info.paciente}
          fullWidth
        >
          <MenuItem value={"Ignacio Ledesma"}>Ignacio Ledesma</MenuItem>
          <MenuItem value={"Gonzalo Berro"}>Gonzalo Berro</MenuItem>
          <MenuItem value={"Matias Solimo"}>Matias Solimo</MenuItem>
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
          <MenuItem value={30}>FSINET</MenuItem>
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
            onClick={() =>
              dispatch(borrarTurno(turno_info.index, turno_info.horario))
            }
          >
            Eliminar
          </Button>
        </Grid>
        <Grid item md={8} xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={crearTurno}
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
