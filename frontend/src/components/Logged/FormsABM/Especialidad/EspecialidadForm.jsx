import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setEspecialidad,
  getListaEspecialidad,
} from "actions/EspecialidadActions";
import { useSnackbar } from "notistack";
import { url_servidor, error_generico } from "Utils/constants";
import { ERROR_MESSAGE } from "actions/types";
export default function EspecialidadForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const [nombreEspecialidad, setNombreEspecialidad] = useState("");
  const [cdEspecialidad, setCdEspecialidad] = useState(0);
  const especialidad = useSelector((state) => state.especialidad.especialidad);

  const guardarEspecialidad = () => {
    if (nombreEspecialidad !== undefined && nombreEspecialidad !== "") {
      fetch(url_servidor + "especialidad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          cd_especialidad: cdEspecialidad,
          nombre: nombreEspecialidad,
        }),
      })
        .then(function (response) {
          if (response.status === 200) {
            enqueueSnackbar("Se guardó la Especialidad", {
              variant: "success",
            });
            dispatch(getListaEspecialidad());
            nuevaEspecialidad();
          } else {
            enqueueSnackbar("Error al guardar la Especialidad", {
              variant: "error",
            });
          }
        })
        .catch(() => {
          dispatch({
            type: ERROR_MESSAGE,
            payload: {
              message: error_generico,
              tipo: "error",
            },
          });
        });
    } else {
      enqueueSnackbar("No puede dejar el nombre en blanco", {
        variant: "warning",
      });
    }
  };

  useEffect(() => {
    setNombreEspecialidad(especialidad.nombre);
    setCdEspecialidad(especialidad.cd_especialidad);
  }, [especialidad]);

  const nuevaEspecialidad = () => {
    setNombreEspecialidad("");
    setCdEspecialidad(0);
    dispatch(setEspecialidad({}));
  };

  return (
    <div>
      <Grid container>
        <Grid
          item
          lg={10}
          xs={12}
          md={8}
          sm={12}
          className={classes.headerForm}
        >
          Crear/Editar Especialidad
        </Grid>
        <Grid item lg={2} xs={12} md={4} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
            style={{ width: "100%" }}
            onClick={nuevaEspecialidad}
          >
            Nueva
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.gridForm}>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label={"Especialidad"}
            fullWidth
            value={nombreEspecialidad}
            onChange={(event) => setNombreEspecialidad(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={guardarEspecialidad}
            fullWidth
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  headerForm: {
    textAlign: "center",
    paddingTop: 20,
  },
  buttonForm: {
    paddingRight: 10,
    paddingTop: 10,
  },
  gridForm: {
    padding: 10,
  },
}));
