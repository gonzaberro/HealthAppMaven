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
          cdTipoServicio: cdTipoServicio,
          nombre: nombre,
        }),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó el Tipo de Servicio", {
            variant: "success",
          });
          dispatch(getListaTipoServicios());
          nuevoTipoServicio();
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
    setCdTipoServicio(tipoServicio.cdTipoServicio);
    setNombre(tipoServicio.nombre);
  }, [tipoServicio]);

  const nuevoTipoServicio = () => {
    dispatch(
      setTipoServicio({
        cdTipoServicio: 0,
        nombre: "",
      })
    );
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
          Crear/Editar Tipo Servicio
        </Grid>
        <Grid item lg={2} xs={12} md={4} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
            style={{ width: "100%" }}
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
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={guardarTipoServicio}
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
