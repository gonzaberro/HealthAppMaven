import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { formatDateString } from "Utils/functions";
import {
  setDiaMesSeleccionado,
  selectProfesionalAgenda,
} from "actions/AgendaActions";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SWITCH_MENU } from "actions/types";
import { menuOptions } from "Utils/constants";
import Alert from "@material-ui/lab/Alert";

export default function ListaTurnos() {
  const listaTurnos = useSelector((state) => state.buscarTurnos.turnos);
  const classes = useStyles();
  const dispatch = useDispatch();
  const gotoDiaCalendario = (fecha_seleccionada, profesional) => {
    const ye = new Intl.DateTimeFormat("es", { year: "numeric" }).format(
      fecha_seleccionada
    ); //Anio en formato YYYY de la fecha que seleccione
    const mo = new Intl.DateTimeFormat("es", { month: "2-digit" }).format(
      fecha_seleccionada
    ); //MES en formato MM de la fecha que seleccione
    dispatch(selectProfesionalAgenda(profesional));
    dispatch(
      setDiaMesSeleccionado(new Date(ye, mo - 1, fecha_seleccionada.getDate()))
    ); //Seteo la fecha del calendario con la fecha que seleccione
    dispatch({
      type: SWITCH_MENU,
      payload: { menu: menuOptions.Agenda_DIARIA, limpiar: true },
    }); //Voy a ver la visual del calendario por DIA*/
  };

  const armarListaTurnos = () => {
    return listaTurnos.map((turno) => {
      return (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              variant="h5"
              style={{
                color: "#4051b5",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
              component="h2"
              gutterBottom
            >
              {turno.paciente.nombre} {turno.paciente.apellido} -{" "}
              {turno.paciente.dni}
            </Typography>
            <Typography variant="h5" component="h2">
              {formatDateString(new Date(turno.fecha))} - {turno.hora}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Servicio: {turno.servicio.nombre} - {turno.tipoServicio.nombre}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Profesional: {turno.profesional.nombre}{" "}
              {turno.profesional.apellido} | Mn. {turno.profesional.matricula}
            </Typography>
            <Typography variant="body2" component="p">
              Notas: {turno.notas}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() =>
                gotoDiaCalendario(new Date(turno.fecha), turno.profesional.dni)
              }
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  const cardsTurnos = () => {
    return listaTurnos && listaTurnos.length > 0 ? (
      armarListaTurnos()
    ) : (
      <div className={classes.rootAlert}>
        <Alert variant="filled" severity="warning">
          No se encontraron turnos
        </Alert>
      </div>
    );
  };

  return (
    <div className={classes.containerTurnos}>
      {listaTurnos ? cardsTurnos() : ""}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: 5,
    "&:hover": {
      border: "1px solid #4051b5",
    },
  },
  rootAlert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  containerTurnos: {
    padding: 20,
    maxHeight: "95vh",
    overflowY: "auto",
    backgroundColor: "#f1f1f1",
  },
}));
