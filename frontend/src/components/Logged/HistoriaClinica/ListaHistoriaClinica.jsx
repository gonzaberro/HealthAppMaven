import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { formatDateString } from "Utils/functions";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getListaHistoriaClinica,
  setHistoriaClinica,
  setModalHistoriaClinica,
  eliminarHistoriaClinica,
} from "actions/HistoriaClinicaActions";
import { especialidadesPaciente } from "actions/EspecialidadActions";
import Alert from "@material-ui/lab/Alert";
import { confirmAlert } from "react-confirm-alert"; // Import

export default function ListaHistoriaClinica() {
  const listaHistoriaClinica = useSelector(
    (state) => state.historiaClinica.listaHistoriaClinica
  );

  const paciente = useSelector((state) => state.buscarTurnos.paciente);
  const historiaClinicaSeleccionada = useSelector(
    (state) => state.historiaClinica.historiaClinica
  );
  const especialidad = useSelector((state) => state.especialidad.especialidad);
  const classes = useStyles();

  const dispatch = useDispatch();

  const seleccionarHistoriaClinica = (historia_clinica) => {
    dispatch(setHistoriaClinica(historia_clinica));
    dispatch(setModalHistoriaClinica(true));
  };
  const deleteHistoriaClinica = (historiaClinica) => {
    confirmAlert({
      title: `Historia Clínica #${historiaClinica.id_historia_clinica}`,
      message:
        "Paciente: " +
        historiaClinica.paciente.nombre +
        " " +
        historiaClinica.paciente.apellido +
        " - " +
        historiaClinica.paciente.dni,
      buttons: [
        {
          label: "Eliminar",
          onClick: () =>
            dispatch(
              eliminarHistoriaClinica(
                historiaClinica.id_historia_clinica,
                () =>
                  dispatch(
                    getListaHistoriaClinica(
                      paciente,
                      especialidad.cd_especialidad
                    )
                  ),
                () => dispatch(especialidadesPaciente(paciente))
              )
            ),
        },
        {
          label: "Cancelar",
        },
      ],
    });
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
              #{historia_clinica.id_historia_clinica} - Ingreso:{" "}
              {formatDateString(new Date(historia_clinica.fechaIngreso))}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Profesional:{" "}
              {historia_clinica.profesional.nombre +
                " " +
                historia_clinica.profesional.apellido +
                " (" +
                historia_clinica.profesional.especialidad.nombre +
                ")"}
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
            <Grid container>
              <Grid item lg={2} md={2} sm={3} xs={6}>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => seleccionarHistoriaClinica(historia_clinica)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Grid>
              <Grid item lg={2} md={2} sm={3} xs={6}>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => deleteHistoriaClinica(historia_clinica)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      );
    });
  };

  const cardsTurnos = () => {
    return (
      <Grid container>
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
    margin: 5,
    border: "1px solid #fff",
    "&:hover": {
      border: "1px solid #4051b5",
      cursor: "pointer",
    },
  },
  rootSeleccionado: {
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
    maxHeight: "80vh",
    minHeight: "80vh",
    overflowY: "auto",
    backgroundColor: "#f1f1f1",
  },
}));
