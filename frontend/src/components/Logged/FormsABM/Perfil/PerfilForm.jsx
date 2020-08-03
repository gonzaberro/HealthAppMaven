import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setPerfil, getListaPerfil } from "actions/PerfilActions";
import { useSnackbar } from "notistack";
import { url_servidor, error_generico } from "Utils/constants";
import { ERROR_MESSAGE } from "actions/types";
export default function PerfilForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const [nombrePerfil, setNombrePerfil] = useState("");
  const [cdPerfil, setCdPerfil] = useState(0);
  const perfil = useSelector((state) => state.perfil.perfil);

  const guardarPerfil = () => {
    if (nombrePerfil !== undefined && nombrePerfil !== "") {
      fetch(url_servidor + "perfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          cdPerfil: cdPerfil,
          dsPerfil: nombrePerfil,
        }),
      })
        .then(function (response) {
          if (response.status === 200) {
            enqueueSnackbar("Se guardó el Perfil", {
              variant: "success",
            });
            dispatch(getListaPerfil());
            nuevoPerfil();
          } else {
            enqueueSnackbar("Error al guardar el Perfil", {
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
    if (perfil.cdPerfil !== undefined) {
      setNombrePerfil(perfil.dsPerfil);
      setCdPerfil(perfil.cdPerfil);
    }
  }, [perfil]);

  const nuevoPerfil = () => {
    setNombrePerfil("");
    setCdPerfil(0);
    dispatch(setPerfil({}));
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
          Crear/Editar Perfil
        </Grid>
        <Grid item lg={2} xs={12} md={4} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
            style={{ width: "100%" }}
            onClick={nuevoPerfil}
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.gridForm}>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label={"Perfil"}
            fullWidth
            value={nombrePerfil}
            onChange={(event) => setNombrePerfil(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={guardarPerfil}
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
