import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { getTurnos } from "actions/AgendaActions";
import Chip from "@material-ui/core/Chip";
import { useSelector, useDispatch } from "react-redux";
import {
  setHorario,
  editTurnoComplete,
} from "../../../actions/EditTurnoActions";
import { fechaString } from "Utils/functions";
import { makeStyles } from "@material-ui/core/styles";
export default function ItemsAgendaHeader() {
  const turnos = useSelector((state) => state.agenda_reducer.turnos);
  const horarios = useSelector((state) => state.agenda_reducer.horarios);
  const fecha_agenda = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );
  const profesional_seleccionado = useSelector(
    (state) => state.agenda_reducer.profesional_seleccionado
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getTurnos(fechaString(fecha_agenda), profesional_seleccionado));
  }, [fecha_agenda]);

  const editTurno = (turno) => {
    dispatch(editTurnoComplete(turno));
  };
  return (
    <>
      {horarios &&
        horarios.map((horario) => {
          return (
            <Grid
              key={"horario_" + horario}
              container
              style={{ minHeight: "5vh", zIndex: 0 }}
            >
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={1}
                className={classes.gridHorarios}
              >
                <label className={classes.labelHorario}>{horario}</label>
              </Grid>
              <Grid
                item
                xs={10}
                sm={10}
                md={10}
                lg={11}
                onClick={() => dispatch(setHorario(horario))}
                className={classes.containerTurnosGrid}
              >
                {turnos
                  .filter((turno) => {
                    return turno.hora === horario;
                  })
                  .map((turno, index) => {
                    return (
                      <Chip
                        clickable={true}
                        key={index}
                        className={classes.chipTurnos}
                        onClick={() => editTurno(turno)}
                        color="primary"
                        label={
                          turno.paciente.dni +
                          " - " +
                          turno.paciente.nombre +
                          " " +
                          turno.paciente.apellido +
                          " (" +
                          turno.tipoServicio.nombre +
                          ")"
                        }
                      ></Chip>
                    );
                  })}
              </Grid>
            </Grid>
          );
        })}
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  containerTurnosGrid: {
    borderTop: "1px solid #eeeeee",
    borderLeft: "1px solid #eeeeee",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#efefef",
      color: "#fff",
    },
  },
  chipTurnos: {
    margin: 5,
    zIndex: 0,
    boxShadow: "2px 2px 3px 1px #cdcdcd",
    "&:hover": {
      border: "1px solid #2c41b5",
      backgroundColor: "#eeeeee",
      color: theme.palette.primary.main,
    },
  },
  labelHorario: {
    color: "#0000008a",
    fontWeight: "bold",
    userSelect: "none",
  },
  gridHorarios: {
    paddingTop: 15,
    textAlign: "center",
  },
}));
