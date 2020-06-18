import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";
import {
  getListaTipoServicios,
  setTipoServicio,
} from "actions/TipoServicioActions";

export default function TipoServicioForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [nombre, setNombre] = useState("");
  const [cdTipoServicio, setCdTipoServicio] = useState(0);
  const tipoServicio = useSelector((state) => state.tipoServicio.tipoServicio);

  const guardarTipoServicio = () => {
    if (nombre !== "" && cdTipoServicio !== "") {
      fetch(url_servidor + "tipoServicio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cd_tipo_servicio: cdTipoServicio,
          nombre: nombre,
        }),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó el Tipo de Servicio", {
            variant: "success",
          });
          dispatch(getListaTipoServicios());
        } else {
          enqueueSnackbar("Error al guardar el Tipo de Servicio", {
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
    setCdTipoServicio(tipoServicio.cd_tipo_servicio);
    setNombre(tipoServicio.nombre);
  }, [tipoServicio]);

  const nuevoTipoServicio = () => {
    dispatch(
      setTipoServicio({
        cd_tipo_servicio: 0,
        nombre: "",
      })
    );
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
            onClick={nuevoTipoServicio}
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
            label={"Servicio"}
            fullWidth
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={guardarTipoServicio}
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