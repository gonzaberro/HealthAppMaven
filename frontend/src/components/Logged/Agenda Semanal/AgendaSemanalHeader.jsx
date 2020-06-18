import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import FilterDoctorAgenda from "../Agenda/FilterDoctorAgenda";
import { setFechaAgenda } from "../../../actions/AgendaActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

export default function AgendaSemanalHeader() {
  const fechaCalendario = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const getMonday = useCallback(() => {
    let dia = fechaCalendario;
    let day = dia.getDay(),
      diff = dia.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday

    return new Date(dia.setDate(diff));
  }, [fechaCalendario]);

  const [inicioSemana, setInicioSemana] = useState(getMonday());

  useEffect(() => {
    setInicioSemana(getMonday());
  }, [fechaCalendario, getMonday]);

  const downFecha = () => {
    const anterior_lunes = inicioSemana;
    anterior_lunes.setDate(anterior_lunes.getDate() - 7);

    dispatch(setFechaAgenda(anterior_lunes));
  };
  const upFecha = () => {
    const siguiente_lunes = inicioSemana;
    siguiente_lunes.setDate(siguiente_lunes.getDate() + 7);
    dispatch(setFechaAgenda(siguiente_lunes));
  };
  const setDateToday = () => {
    dispatch(setFechaAgenda(new Date()));
  };

  const fechaString = () => {
    const dia_lunes = inicioSemana.getDate();

    const mo = new Intl.DateTimeFormat("es", { month: "long" }).format(
      inicioSemana
    );

    const fecha_sabado = inicioSemana;
    fecha_sabado.setDate(fecha_sabado.getDate() + 5);

    const mo_sabado = new Intl.DateTimeFormat("es", { month: "long" }).format(
      fecha_sabado
    );

    let fecha =
      fecha_sabado.getDate() < dia_lunes
        ? dia_lunes +
          " de " +
          mo.toUpperCase() +
          " - " +
          fecha_sabado.getDate() +
          " de " +
          mo_sabado.toUpperCase()
        : dia_lunes +
          " de " +
          mo.toUpperCase() +
          " - " +
          fecha_sabado.getDate() +
          " de " +
          mo.toUpperCase();

    return fecha;
  };

  return (
    <>
      <Grid container style={{ height: "5%" }}>
        <Grid
          item
          md={1}
          xs={12}
          className={classes.arrowAgenda}
          onClick={downFecha}
        >
          <FontAwesomeIcon style={{ color: "#db3d44" }} icon={faChevronLeft} />
        </Grid>
        <Grid item md={1} xs={2} className={classes.gridButtonHoy}>
          <Button variant="contained" onClick={setDateToday}>
            Hoy
          </Button>
        </Grid>
        <Grid item md={3} xs={5} className={classes.fechaAgenda}>
          {fechaString()}
        </Grid>
        <Grid item md={6} xs={5} className={classes.gridFilterDoctor}>
          <FilterDoctorAgenda />
        </Grid>
        <Grid
          item
          md={1}
          xs={12}
          className={classes.arrowAgenda}
          onClick={upFecha}
        >
          <FontAwesomeIcon style={{ color: "#db3d44" }} icon={faChevronRight} />
        </Grid>
      </Grid>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  arrowAgenda: {
    borderBottom: "1px solid #ccc",
    borderTop: "1px solid #ccc",
    padding: "2%",
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
  gridFilterDoctor: {
    paddingTop: "1%",
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    paddingRight: 10,
    textAlign: "center",
  },
  gridButtonHoy: {
    paddingTop: "1%",
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",

    textAlign: "center",
  },
  fechaAgenda: {
    paddingTop: "2%",
    borderBottom: "1px solid #ccc",
    borderTop: "1px solid #ccc",
    textAlign: "center",

    color: "#0000008a",
    fontWeight: "bold",
    userSelect: "none",
  },
}));
