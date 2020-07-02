import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { formatDateString } from "Utils/functions";
import {
  getListaHistoriaClinica,
  setHistoriaClinica,
  setModalHistoriaClinica,
} from "actions/HistoriaClinicaActions";
import Alert from "@material-ui/lab/Alert";

export default function ListaHistoriaClinica() {
  const paciente = useSelector((state) => state.buscarTurnos.paciente);
  const listaHistoriaClinica = useSelector(
    (state) => state.historiaClinica.listaHistoriaClinica
  );
  const historiaClinicaSeleccionada = useSelector(
    (state) => state.historiaClinica.historiaClinica
  );
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListaHistoriaClinica(paciente));
  }, [dispatch, paciente]);
  const seleccionarHistoriaClinica = (historia_clinica) => {
    dispatch(setHistoriaClinica(historia_clinica));
    dispatch(setModalHistoriaClinica(true));
  };
  const nuevaHistoriaClinica = () => {
    dispatch(setHistoriaClinica({}));
    dispatch(setModalHistoriaClinica(true));
  };
  const armarListaHistoriaClinica = () => {
    return listaHistoriaClinica.map((historia_clinica, index) => {
      return (
        <Card
          key={index}
          className={
            historiaClinicaSeleccionada.id_historia_clinica ===
            historia_clinica.id_historia_clinica
              ? classes.rootSeleccionado
              : classes.root
          }
        >
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
              Ingreso:{" "}
              {formatDateString(new Date(historia_clinica.fechaIngreso))}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Profesional:{" "}
              {historia_clinica.profesional.nombre +
                " " +
                historia_clinica.profesional.apellido}
            </Typography>
            <Typography variant="body2" component="p">
              Cantidad de Sesiones: {historia_clinica.cantidadSesiones}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              style={{ borderBottom: "1px solid #ccc", paddingBottom: 8 }}
            >
              Fecha Quirurgica:{" "}
              {historia_clinica.fechaQuirurgica === null
                ? "No Requiere"
                : formatDateString(new Date(historia_clinica.fechaQuirurgica))}
            </Typography>

            <Typography
              variant="body2"
              component="p"
              style={{ padding: 10, paddingLeft: 0 }}
            >
              Diagnostico: {historia_clinica.diagnostico}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              style={{ padding: 10, paddingLeft: 0 }}
            >
              Tratamiento: {historia_clinica.tratamiento}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => seleccionarHistoriaClinica(historia_clinica)}
            >
              Editar
            </Button>
          </CardActions>
        </Card>
      );
    });
  };

  const cardsTurnos = () => {
    return (
      <Grid container>
        <Grid item md={9} sm={6} xs={12}></Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={paciente ? false : true}
            style={{ width: "100%" }}
            onClick={() => nuevaHistoriaClinica()}
          >
            Nueva Historia Clínica
          </Button>
        </Grid>

        <Grid item xs={12} style={{ marginTop: 10 }}>
          {listaHistoriaClinica && listaHistoriaClinica.length > 0 ? (
            armarListaHistoriaClinica()
          ) : (
            <div className={classes.rootAlert}>
              <Alert variant="filled" severity="warning">
                No se encontraron historias clínicas
              </Alert>
            </div>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={classes.containerTurnos}>
      {listaHistoriaClinica ? cardsTurnos() : ""}
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
  rootSeleccionado: {
    minWidth: 275,
    margin: 5,
    border: "2px solid  #4051b5",
  },
  rootAlert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginTop: 10,
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
    paddingTop: 10,
    maxHeight: "95vh",
    overflowY: "auto",
    backgroundColor: "#f1f1f1",
  },
}));
