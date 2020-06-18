import React from "react";
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

export default function AgendaMensualHeader() {
  const fechaCalendario = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );
  const classes = useStyles();

  const dispatch = useDispatch();

  const crearFechaPrimerDia = () => {
    //Me paro siempre en el dia 1 del mes
    const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(
      fechaCalendario
    ); //Anio en formato YYYY de la fecha que seleccione
    const mo = new Intl.DateTimeFormat("es", { month: "2-digit" }).format(
      fechaCalendario
    ); //MES en formato MM de la fecha que seleccione

    return new Date(ye, mo - 1, 1);
  };

  const downFecha = () => {
    let date = crearFechaPrimerDia();
    date.setMonth(date.getMonth() - 1);
    dispatch(setFechaAgenda(date));
  };
  const upFecha = () => {
    let date = crearFechaPrimerDia();
    date.setMonth(date.getMonth() + 1);
    dispatch(setFechaAgenda(date));
  };
  const setDateToday = () => {
    dispatch(setFechaAgenda(new Date()));
  };

  const fechaString = () => {
    const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(
      fechaCalendario
    );
    const mo = new Intl.DateTimeFormat("es", { month: "long" }).format(
      fechaCalendario
    );

    return mo.toUpperCase() + " del " + ye;
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
