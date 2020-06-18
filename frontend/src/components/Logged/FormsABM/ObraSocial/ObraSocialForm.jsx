import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setObraSocial, getListaObrasSocial } from "actions/ObraSocialActions";
import { useSnackbar } from "notistack";

export default function ObraSocialForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [nombreObraSocial, setNombreObraSocial] = useState("");
  const [cdObraSocial, setCdObraSocial] = useState(0);
  const obra_social = useSelector((state) => state.obra_social.obraSocial);

  const guardarObraSocial = () => {
    if (nombreObraSocial !== "") {
      fetch("http://localhost:8080/obraSocial", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cd_os: cdObraSocial, nombre: nombreObraSocial }),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó la Obra Social", {
            variant: "success",
          });
          dispatch(getListaObrasSocial());
        } else {
          enqueueSnackbar("Error al guardar la Obra Social", {
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
    setNombreObraSocial(obra_social.nombre);
    setCdObraSocial(obra_social.cd_os);
  }, [obra_social]);

  const nuevaObraSocial = () => {
    dispatch(
      setObraSocial({
        cd_os: 0,
        nombre: "",
      })
    );
  };

  return (
    <div>
      <Grid container>
        <Grid item lg={10} xs={8} md={8} sm={8} className={classes.headerForm}>
          Crear/Editar Obra Social
        </Grid>
        <Grid item lg={2} xs={4} md={4} sm={4} className={classes.buttonForm}>
          <Button variant="contained" color="default" onClick={nuevaObraSocial}>
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
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={guardarObraSocial}
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
