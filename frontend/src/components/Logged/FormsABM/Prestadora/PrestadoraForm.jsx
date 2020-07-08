import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setPrestadora, getPrestadoras } from "actions/PrestadoraActions";
import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";
import { horarios } from "Utils/constants";
export default function PrestadoraForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [cdPrestadora, setCdPrestadora] = useState(0);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [logo, setLogo] = useState("");
  const [intervalo, setIntervalo] = useState("");
  const [horaDesde, setHoraDesde] = useState("");
  const [horaHasta, setHoraHasta] = useState("");

  const prestadora = useSelector((state) => state.prestadora.prestadora);
  const validarCampos = () => {
    if (
      nombre === "" ||
      direccion === "" ||
      telefono === "" ||
      intervalo === ""
    ) {
      return false;
    } else {
      return true;
    }
  };
  const guardarHorario = () => {
    if (validarCampos) {
      fetch(url_servidor + "prestadora", {
        method: cdPrestadora !== 0 ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cd_prestadora: cdPrestadora,
          nombre: nombre,
          telefono: telefono,
          direccion: direccion,
          logo: logo,
          intervalo: intervalo,
          horaDesde: horaDesde,
          horaHasta: horaHasta,
        }),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó la Prestadora", {
            variant: "success",
          });
          dispatch(getPrestadoras());
          nuevaPrestadora();
        } else {
          enqueueSnackbar("Error al guardar la Prestadora", {
            variant: "error",
          });
        }
      });
    } else {
      enqueueSnackbar("No puede dejar campos en blanco", {
        variant: "warning",
      });
    }
  };

  useEffect(() => {
    setCdPrestadora(prestadora.cd_prestadora);
    setNombre(prestadora.nombre);
    setDireccion(prestadora.direccion);
    setTelefono(prestadora.telefono);
    setLogo(prestadora.logo);
    setIntervalo(prestadora.intervalo);
    setHoraDesde(prestadora.horaDesde);
    setHoraHasta(prestadora.horaHasta);
  }, [prestadora]);

  const nuevaPrestadora = () => {
    setCdPrestadora(0);
    setNombre("");
    setDireccion("");
    setTelefono("");
    setLogo("");
    setIntervalo("");
    setHoraDesde("");
    setHoraHasta("");

    dispatch(setPrestadora({}));
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
          Crear/Editar Prestadora
        </Grid>
        <Grid item lg={2} xs={12} md={4} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
            style={{ width: "100%" }}
            onClick={nuevaPrestadora}
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.gridForm}>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Grid container>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <TextField
                variant="outlined"
                margin="normal"
                label={"Nombre"}
                fullWidth
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <TextField
                variant="outlined"
                margin="normal"
                label={"Telefono"}
                fullWidth
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Grid container>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <TextField
                variant="outlined"
                margin="normal"
                label={"Dirección"}
                fullWidth
                value={direccion}
                onChange={(event) => setDireccion(event.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label={"Intervalo (en minutos)"}
            fullWidth
            value={intervalo}
            onChange={(event) => setIntervalo(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={12} lg={12} style={{ marginTop: 15 }}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Hora Desde
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Hora Desde"
              fullWidth
              value={horaDesde}
              onChange={(event) => setHoraDesde(event.target.value)}
            >
              {horarios &&
                horarios.map((hora) => {
                  return <MenuItem value={hora}>{hora}</MenuItem>;
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} sm={6} lg={12} style={{ marginTop: 15 }}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Hora Hasta
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Hora Hasta"
              fullWidth
              value={horaHasta}
              onChange={(event) => setHoraHasta(event.target.value)}
            >
              {horarios &&
                horarios.map((hora) => {
                  return <MenuItem value={hora}>{hora}</MenuItem>;
                })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12} sm={12} lg={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label={"Logo"}
            fullWidth
            value={logo}
            onChange={(event) => setLogo(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={guardarHorario}
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
