import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";
import { getListaServicios, setServicio } from "actions/ServicioActions";

export default function ServicioForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const [nombre, setNombre] = useState("");
  const [cdServicio, setCdServicio] = useState("");
  const servicio = useSelector((state) => state.servicio.servicio);

  const guardarServicio = () => {
    if (
      nombre !== undefined &&
      nombre !== "" &&
      cdServicio !== undefined &&
      cdServicio !== ""
    ) {
      fetch(url_servidor + "servicio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          cd_servicio: cdServicio,
          nombre: nombre,
        }),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó el Servicio", {
            variant: "success",
          });
          dispatch(getListaServicios());
          nuevServicio();
        } else {
          enqueueSnackbar("Error al guardar el Servicio", {
            variant: "error",
          });
        }
      });
    } else {
      enqueueSnackbar("No puede dejar el nombre ni el código en blanco", {
        variant: "warning",
      });
    }
  };

  useEffect(() => {
    setCdServicio(servicio.cd_servicio);
    setNombre(servicio.nombre);
  }, [servicio]);

  const nuevServicio = () => {
    setCdServicio("");
    setNombre("");
    dispatch(setServicio({}));
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
          Crear/Editar Servicio
        </Grid>
        <Grid item lg={2} xs={12} md={4} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
            style={{ width: "100%" }}
            onClick={nuevServicio}
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
            label={"Código Servicio"}
            fullWidth
            value={cdServicio}
            onChange={(event) => setCdServicio(event.target.value)}
          />
        </Grid>
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
            onClick={guardarServicio}
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
