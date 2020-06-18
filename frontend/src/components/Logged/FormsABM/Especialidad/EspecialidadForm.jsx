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
import { url_servidor } from "Utils/constants";

export default function EspecialidadForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [nombreEspecialidad, setNombreEspecialidad] = useState("");
  const [cdEspecialidad, setCdEspecialidad] = useState(0);
  const especialidad = useSelector((state) => state.especialidad.especialidad);

  const guardarEspecialidad = () => {
    if (nombreEspecialidad !== "") {
      fetch(url_servidor + "especialidad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cd_especialidad: cdEspecialidad,
          nombre: nombreEspecialidad,
        }),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó la Especialidad", {
            variant: "success",
          });
          dispatch(getListaEspecialidad());
        } else {
          enqueueSnackbar("Error al guardar la Especialidad", {
            variant: "error",
          });
        }
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
        <Grid item lg={10} xs={8} md={8} sm={8} className={classes.headerForm}>
          Crear/Editar Especialidad
        </Grid>
        <Grid item lg={2} xs={4} md={4} sm={4} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
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
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={guardarEspecialidad}
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
    paddingTop: 10,
  },
  gridForm: {
    padding: 10,
  },
}));
