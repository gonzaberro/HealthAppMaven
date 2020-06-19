import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setPlan, getListaPlanes } from "actions/PlanActions";

import { useSnackbar } from "notistack";
import { url_servidor } from "Utils/constants";

export default function PlanForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [nombrePlan, setNombrePlan] = useState("");
  const [cdPlan, setCdPlan] = useState(0);
  const plan = useSelector((state) => state.plan.plan);
  const [obraSocial, setObraSocial] = useState(0);
  const listaObrasSociales = useSelector(
    (state) => state.obra_social.listaObrasSociales
  );

  const guardarPlan = () => {
    if (nombrePlan !== "" && obraSocial !== 0) {
      fetch(url_servidor + "plan", {
        method: cdPlan !== 0 ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cd_plan: cdPlan,
          nombre: nombrePlan,
          obraSocial: { cd_os: obraSocial, nombre: "" },
        }),
      }).then(function (response) {
        if (response.status === 200) {
          enqueueSnackbar("Se guardó el Plan", {
            variant: "success",
          });
          dispatch(getListaPlanes());
        } else {
          enqueueSnackbar("Error al guardar el Plan", {
            variant: "error",
          });
        }
      });
    } else {
      enqueueSnackbar(
        "No puede dejar el nombre, ni la obra social, en blanco",
        {
          variant: "warning",
        }
      );
    }
  };

  useEffect(() => {
    setNombrePlan(plan.nombre);
    setCdPlan(plan.cd_plan);
    if (plan.obraSocial !== undefined) setObraSocial(plan.obraSocial.cd_os);
  }, [plan]);

  const nuevoPlan = () => {
    setNombrePlan("");
    setCdPlan(0);
    setObraSocial(0);
    dispatch(setPlan({}));
  };

  return (
    <div>
      <Grid container>
        <Grid item lg={10} xs={8} md={8} sm={8} className={classes.headerForm}>
          Crear/Editar Plan
        </Grid>
        <Grid item lg={2} xs={4} md={4} sm={4} className={classes.buttonForm}>
          <Button variant="contained" color="default" onClick={nuevoPlan}>
            Nuevo
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.gridForm}>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Obra Social
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Institución"
              fullWidth
              value={obraSocial}
              onChange={(event) => setObraSocial(event.target.value)}
            >
              {listaObrasSociales &&
                listaObrasSociales.map((obraSocial) => {
                  return (
                    <MenuItem value={obraSocial.cd_os}>
                      {obraSocial.nombre}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <TextField
            variant="outlined"
            margin="normal"
            label={"Plan"}
            fullWidth
            value={nombrePlan}
            onChange={(event) => setNombrePlan(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Button variant="contained" color="primary" onClick={guardarPlan}>
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
