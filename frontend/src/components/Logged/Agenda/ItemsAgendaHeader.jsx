import React from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import FilterDoctorAgenda from "./FilterDoctorAgenda";
import { setFechaAgenda } from "../../../actions/AgendaActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

export default function ItemsAgendaHeader() {
  const fechaCalendario = useSelector(
    (state) => state.agenda_reducer.fecha_agenda
  );
  const classes = useStyles();

  const dispatch = useDispatch();

  const downFecha = () => {
    dispatch(
      setFechaAgenda(new Date(new Date(fechaCalendario).valueOf() - 86400000))
    );
  };
  const upFecha = () => {
    dispatch(
      setFechaAgenda(new Date(new Date(fechaCalendario).valueOf() + 86400000))
    );
  };
  const setDateToday = () => {
    dispatch(setFechaAgenda(new Date()));
  };

  const fechaString = () => {
    const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(
      fechaCalendario
    );
    const mo = new Intl.DateTimeFormat("es", { month: "short" }).format(
      fechaCalendario
    );
    const da = new Intl.DateTimeFormat("es", { day: "2-digit" }).format(
      fechaCalendario
    );

    var weekday = new Array(7);
    weekday[0] = "Domingo";
    weekday[1] = "Lunes";
    weekday[2] = "Martes";
    weekday[3] = "Miércoles";
    weekday[4] = "Jueves";
    weekday[5] = "Viernes";
    weekday[6] = "Sábado";

    var n = weekday[fechaCalendario.getDay()];

    return n + " " + da + " de " + mo + " del " + ye;
  };

  return (
    <>
      <Grid container style={{ minheight: "5%" }}>
        <Grid
          item
          sm={2}
          md={1}
          xs={12}
          lg={1}
          className={classes.arrowAgenda}
          onClick={downFecha}
        >
          <FontAwesomeIcon style={{ color: "#db3d44" }} icon={faChevronLeft} />
        </Grid>
        <Grid
          item
          sm={8}
          md={10}
          xs={12}
          lg={10}
          className={classes.gridContainerButtons}
        >
          <Grid container>
            <Grid
              item
              md={2}
              xs={3}
              sm={2}
              lg={2}
              className={classes.gridButtonHoy}
            >
              <Button variant="contained" onClick={setDateToday}>
                Hoy
              </Button>
            </Grid>
            <Grid
              item
              md={10}
              xs={9}
              sm={10}
              lg={5}
              className={classes.fechaAgenda}
            >
              {fechaString()}
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              sm={12}
              lg={5}
              className={classes.gridFilterDoctor}
            >
              <FilterDoctorAgenda />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sm={2}
          md={1}
          lg={1}
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
    padding: "1%",

    textAlign: "center",
  },
  gridButtonHoy: {
    padding: "1%",

    textAlign: "center",
  },
  fechaAgenda: {
    padding: "2%",

    textAlign: "center",

    color: "#0000008a",
    fontWeight: "bold",
    userSelect: "none",
  },
  gridContainerButtons: {
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
  },
}));
