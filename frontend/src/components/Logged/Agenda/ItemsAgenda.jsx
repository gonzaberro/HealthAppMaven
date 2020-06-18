import React from "react";
import Grid from "@material-ui/core/Grid";
import { horarios } from "./itemsAgendaData";
import Chip from "@material-ui/core/Chip";
import { useSelector, useDispatch } from "react-redux";
import {
  setHorario,
  editTurnoComplete,
} from "../../../actions/EditTurnoActions";

import { makeStyles } from "@material-ui/core/styles";
export default function ItemsAgendaHeader() {
  const turnos = useSelector((state) => state.agenda_reducer.turnos);
  const dispatch = useDispatch();
  const classes = useStyles();

  const editTurno = (index, turno_horario) => {
    const foundIndexHorario = turnos.findIndex(
      (horario) => horario.horario === turno_horario
    );

    let aux_turno = turnos[foundIndexHorario].turnos[index];

    let turno = {
      doctor: aux_turno.doctor,
      paciente: aux_turno.paciente,
      servicio: aux_turno.servicio,
      programar: aux_turno.programar,
      fecha: aux_turno.fecha,
      horario: turno_horario,
      nota: aux_turno.nota,
      index: index,
    };

    dispatch(editTurnoComplete(turno));
  };
  return (
    <>
      {horarios.map((horario) => {
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
              {turnos.map((horario_turno) => {
                return horario === horario_turno.horario
                  ? horario_turno.turnos.map((turno, index) => {
                      return (
                        <Chip
                          clickable={true}
                          key={index}
                          className={classes.chipTurnos}
                          onClick={() => editTurno(index, horario)}
                          color="primary"
                          label={"Paciente: " + turno.paciente}
                        ></Chip>
                      );
                    })
                  : null;
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
