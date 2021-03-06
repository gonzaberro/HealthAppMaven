import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setObraSocial, getListaObrasSocial } from "actions/ObraSocialActions";
import { useSnackbar } from "notistack";
import { url_servidor, error_generico } from "Utils/constants";
import { ERROR_MESSAGE } from "actions/types";
export default function ObraSocialForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [nombreObraSocial, setNombreObraSocial] = useState("");
  const [cdObraSocial, setCdObraSocial] = useState(0);
  const obra_social = useSelector((state) => state.obra_social.obraSocial);

  const guardarObraSocial = () => {
    if (nombreObraSocial !== undefined && nombreObraSocial !== "") {
      fetch(url_servidor + "obraSocial", {
        method: cdObraSocial !== 0 ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ cd_os: cdObraSocial, nombre: nombreObraSocial }),
      })
        .then(function (response) {
          if (response.status === 200) {
            enqueueSnackbar("Se guardó la Obra Social", {
              variant: "success",
            });
            dispatch(getListaObrasSocial());
            nuevaObraSocial();
          } else {
            enqueueSnackbar("Error al guardar la Obra Social", {
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
    setNombreObraSocial(obra_social.nombre);
    setCdObraSocial(obra_social.cd_os);
  }, [obra_social]);

  const nuevaObraSocial = () => {
    setNombreObraSocial("");
    setCdObraSocial(0);
    dispatch(setObraSocial({}));
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
          Crear/Editar Obra Social
        </Grid>
        <Grid item lg={2} xs={12} md={4} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
            style={{ width: "100%" }}
            onClick={nuevaObraSocial}
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
            label={"Obra Social"}
            fullWidth
            value={nombreObraSocial}
            onChange={(event) => setNombreObraSocial(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={guardarObraSocial}
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
