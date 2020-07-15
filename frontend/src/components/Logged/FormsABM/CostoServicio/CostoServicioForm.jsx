import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";

import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";
import {
  setCostoServicio,
  getListaCostoServicios,
} from "actions/CostoServicioActions";

export default function CostoServicioForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [costo, setCosto] = useState(0);
  const [cdPlan, setCdPlan] = useState(0);
  const [cdTipoServicio, setCdTipoServicio] = useState(0);
  const [cdServicio, setCdServicio] = useState(0);
  const costoServicio = useSelector(
    (state) => state.costoServicio.costoServicio
  );
  const listaServicios = useSelector((state) => state.servicio.listaServicios);
  const listaPlanes = useSelector((state) => state.plan.listaPlanes);
  const listaTipoServicio = useSelector(
    (state) => state.tipoServicio.listaTipoServicios
  );

  const guardarPlan = () => {
    if (
      costo !== undefined &&
      costo > 0 &&
      cdPlan !== 0 &&
      cdServicio !== 0 &&
      cdTipoServicio !== 0
    ) {
      fetch(url_servidor + "costoServicio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: {
            cdPlan: cdPlan,
            cdServicio: cdServicio,
            tipoServicio: { cdTipoServicio: cdTipoServicio, nombre: "" },
          },
          servicio: { cd_servicio: cdServicio, nombre: "" },
          plan: { cd_plan: cdPlan, nombre: "" },
          costo: costo,
        }),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se asigno el costo al servicio", {
            variant: "success",
          });
          nuevoCostoServicio();
          dispatch(getListaCostoServicios());
        } else {
          enqueueSnackbar("Error al asignar el costo al servicio", {
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
    setCosto(costoServicio.costo);
    if (costoServicio.plan) setCdPlan(costoServicio.plan.cd_plan);
    if (costoServicio.id)
      setCdTipoServicio(costoServicio.id.tipoServicio.cdTipoServicio);
    if (costoServicio.servicio)
      setCdServicio(costoServicio.servicio.cd_servicio);
  }, [costoServicio]);

  const nuevoCostoServicio = () => {
    setCosto(0);
    setCdPlan(0);
    setCdTipoServicio(0);
    setCdServicio(0);

    dispatch(setCostoServicio({}));
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
          Establecer Costo del Servicio
        </Grid>
        <Grid item lg={2} xs={12} md={4} sm={12} className={classes.buttonForm}>
          <Button
            variant="contained"
            color="default"
            style={{ width: "100%" }}
            onClick={nuevoCostoServicio}
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.gridForm}>
        <Grid item xs={12} md={12} sm={12} lg={12} style={{ marginTop: 15 }}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">Plan</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Institución"
              fullWidth
              value={cdPlan}
              onChange={(event) => setCdPlan(event.target.value)}
            >
              {listaPlanes &&
                listaPlanes.map((plan) => {
                  return (
                    <MenuItem key={plan.cd_plan} value={plan.cd_plan}>
                      {plan.obraSocial.nombre} - {plan.nombre}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12} style={{ marginTop: 15 }}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Servicio
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Servicio"
              fullWidth
              value={cdServicio}
              onChange={(event) => setCdServicio(event.target.value)}
            >
              {listaServicios &&
                listaServicios.map((servicio) => {
                  return (
                    <MenuItem
                      key={servicio.cd_servicio}
                      value={servicio.cd_servicio}
                    >
                      {servicio.nombre}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12} style={{ marginTop: 15 }}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Tipo Servicio
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Tipo Servicio"
              fullWidth
              value={cdTipoServicio}
              onChange={(event) => setCdTipoServicio(event.target.value)}
            >
              {listaTipoServicio &&
                listaTipoServicio.map((tipoServicio) => {
                  return (
                    <MenuItem
                      key={tipoServicio.cdTipoServicio}
                      value={tipoServicio.cdTipoServicio}
                    >
                      {tipoServicio.nombre}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <TextField
            variant="outlined"
            type="number"
            margin="normal"
            label={"Costo $"}
            fullWidth
            value={costo}
            onChange={(event) => setCosto(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={guardarPlan}
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
    paddingRight: 10,
  },
  gridForm: {
    padding: 10,
  },
}));
